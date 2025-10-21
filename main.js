import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 350,
    height: 500,
    transparent: true,
    frame: false,
    resizable: true,
    hasShadow: false,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // 👈 preload bridge
    },
  });

  win.loadFile("index.html");
  win.setIgnoreMouseEvents(false);
});

// Toggle resize via preload
ipcMain.on("toggle-resize", (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.setResizable(!win.isResizable());
  }
});

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  toggleResize: () => ipcRenderer.send("toggle-resize"),
});

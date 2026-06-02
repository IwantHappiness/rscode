import { invoke } from "@tauri-apps/api/core";

export async function getFileContent(): Promise<string | undefined> {
  const path = await invoke<string | null>("get_startup_file");
  
  if (path) {
    const content = await invoke<string>("read_file", { path });
    return content;
  }
}
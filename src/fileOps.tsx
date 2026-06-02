import { invoke } from "@tauri-apps/api/core";

export async function getPath(): Promise<string | null> {
  return await invoke<string | null>("get_startup_file");
}

export async function getFileContent(): Promise<string | undefined> {
  const path = await getPath();
  
  if (path) {
    const content = await invoke<string>("read_file", { path });
    return content;
  }
}

export async function saveFile(code: string): Promise<void> {
  const path = await getPath();

  if (path) {
    await invoke<void>("save_file", {
      path: path,
      content: code
    })
  }
}
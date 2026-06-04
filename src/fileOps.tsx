import { invoke } from "@tauri-apps/api/core";
import { open, save, ask } from '@tauri-apps/plugin-dialog';

export async function getPath(): Promise<string | null> {
  return await invoke<string | null>("get_startup_file");
}

export async function getFileContent(
  path: string,
): Promise<string | undefined> {
  if (path) {
    const content = await invoke<string>("read_file", { path });
    return content;
  }
}

export async function saveFile(path: string, code: string): Promise<void> {
  if (path) {
    await invoke<void>("save_file", {
      path: path,
      content: code,
    });
  }
}

export async function openFilePicker(): Promise<string> {
  const file = await open({
    multiple: false,
    directory: false,
  });
  return file ?? '';
}

export async function openFileSaver(): Promise<string> {
  const file = await save();
  return file ?? '';
}

export async function openConfirm(): Promise<boolean> {
  const confirmation = await ask(
    'Unsaved changes will be lost. Are you sure?',
    { title: 'RsCode', kind: 'warning' }
  );
  return confirmation;
}
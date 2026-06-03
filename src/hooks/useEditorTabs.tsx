import { getFileContent, getPath, saveFile, openFilePicker } from "../fileOps";
import { EditorTab } from "../types";
import { useState, useEffect } from "react";

export default function useEditorTabs() {
  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? null;

  async function loadFile(path: string): Promise<string | undefined> {
    // const path: string | undefined = (await getPath()) ?? "";
    let content: string | undefined = "";
    try {
      content = (await getFileContent(path)) ?? "";
    } catch (err) {
      console.error("Failed to read file, opening empty file");
    }

    return content;
  }

  function addTab(tab: EditorTab, path: string) {
    setTabs((previousTabs) => {
      const existingTab = previousTabs.find((tab) => tab.path === path);

      if (existingTab) {
        setActiveTabId(existingTab.id);
        return previousTabs;
      }

      setActiveTabId(tab.id);
      return [...previousTabs, tab];
    });
  }
  
  async function openFile(path: string): Promise<void> {
    const content = await loadFile(path) ?? "";
    const tab: EditorTab = {
      id: crypto.randomUUID(),
      path,
      title: path.split("/").at(-1) ?? path,
      content,
      savedContent: content,
      isDirty: false,
    };
    addTab(tab, path);
  }

  async function openTab() {
    const file: string = await openFilePicker();
    openFile(file);
  }

  useEffect(() => {
    async function main() {
      const path: string | undefined = (await getPath()) ?? "";
      await openFile(path);
    }
    main();
  }, []);

  function updateActiveTabContent(content: string): void {
    if (!activeTabId) return;

    setTabs((tabs) =>
      tabs.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, content, isDirty: content !== tab.savedContent }
          : tab,
      ),
    );
  }

  async function saveActiveTab(): Promise<void> {
    if (!activeTab) return;
    await saveFile(activeTab.path, activeTab.content);
    setTabs((tabs) =>
      tabs.map((tab) =>
        tab.id === activeTab.id
          ? {
              ...tab,
              savedContent: tab.content,
              isDirty: false,
            }
          : tab,
      ),
    );
  }

  return {
    tabs,
    activeTab,
    activeTabId,
    setActiveTabId,
    updateActiveTabContent,
    saveActiveTab,
    openTab
  };
}

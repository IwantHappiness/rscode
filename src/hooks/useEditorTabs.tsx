import { getFileContent, getPath, saveFile, openFilePicker, openFileSaver, openConfirm } from "../fileOps";
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

  async function addTab(tab: EditorTab, path: string) {
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
    const content = (await loadFile(path)) ?? "";
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
    await openFile(file);
  }

  async function closeTab(id: string): Promise<void> {
    // const aId = activeTabId; // alias
    
    const tabToClose = tabs.find((tab) => tab.id === id);
    if (!tabToClose) return;

    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== id); // new array without deleted tab
      
      if (activeTabId === id) { // if deleting an active tab
        if (newTabs.length > 0) { // if active tab is last element
          const closedIndex = prevTabs.findIndex((tab) => tab.id === id);
          const nextActiveIndex = closedIndex - 1; // Math.min(closedIndex, newTabs.length - 1);
          setActiveTabId(newTabs[nextActiveIndex].id);
        } else {
          setActiveTabId(null);
          openFile("");
        }
      }
      
      return newTabs;
    });
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

  async function closeDirty(id: string): Promise<void> {
    if (!id) return;
    if (await openConfirm()) {
      closeTab(id);
    } else {
      await saveActiveTab();
      await closeTab(id);
    }
  }

  async function saveActiveTab(): Promise<void> {
    let path: string;
    if (!activeTab) return;
    if (activeTab.path == "") {
      path = await openFileSaver();
      if (path == "") return;
    } else { path = activeTab.path; }
    await saveFile(path, activeTab.content);
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
    openTab,
    closeTab,
    closeDirty
  };
}

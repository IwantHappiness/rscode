import { getFileContent, getPath, saveFile } from "../fileOps";
import { EditorTab } from "../types";
import { useState, useEffect } from "react";

export default function useEditorTabs() {
  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? null;

  useEffect(() => {
    async function loadFile(): Promise<string | undefined> {
      const path: string | undefined = (await getPath()) ?? "";
      let content: string | undefined = "";
      try {
        content = (await getFileContent(path)) ?? "";
      } catch (err) {
        console.error("Failed to read file, opening empty file");
      }

      return content;
    }

    async function main() {
      const path: string | undefined = (await getPath()) ?? "";
      const content: string | undefined = (await loadFile()) ?? "";
      const tab: EditorTab = {
        id: crypto.randomUUID(),
        path,
        title: path.split("/").at(-1) ?? path,
        content,
        savedContent: content,
        isDirty: false,
      };

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
  };
}

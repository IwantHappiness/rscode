import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { getFileContent, saveFile, getPath } from "./fileOps";
import "./App.css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { rust } from "@codemirror/lang-rust";
import { EditorTab } from "./types";

export default function App() {
  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  // const [code, setCode] = useState("");
  // const [path, setPath] = useState("");

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? null;

  useEffect(() => {
    async function loadFile() {
      const path: string | undefined = (await getPath()) ?? "";

      let content: string | undefined = "";
      try {
        content = await getFileContent() ?? "";
      } catch (err) {
        console.error("Failed to read file, opening empty file")
      }

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

    loadFile();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isSaveShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s";

      if (!isSaveShortcut) return;
      if (!activeTab) return;

      event.preventDefault();
      saveFile(activeTab.content);

      setTabs((tabs) =>
        tabs.map((tab) =>
          tab.id === activeTab.id
            ? {
                ...tab,
                savedContent: tab.content,
                isDirty: false,
              }
            : tab
        )
      );


    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tabs, activeTabId]);

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

  return (
    <>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTabId ? "tab active" : "tab"}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.isDirty && <span className="dirty-dot" />}
            {tab.title === "" && tab.path === "" ? "Unnamed" : tab.title}
          </button>
        ))}
      </div>
      {activeTab && (
        <CodeMirror
          value={activeTab.content}
          theme={vscodeDark}
          extensions={[rust()]}
          onChange={updateActiveTabContent}
        />
      )}
    </>
  );
}

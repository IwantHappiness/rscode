import CodeMirror from "@uiw/react-codemirror";
import TabBar from "./components/TabBar";
import "./App.css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import useEditorTabs from "./hooks/useEditorTabs";
import useSaveShortcut from "./hooks/useSaveShortcut";
import getLang from "./lang";
import { Extension } from "@codemirror/state";
import { useEffect, useState } from "react";

export default function App() {
  const {
    tabs,
    activeTab,
    activeTabId,
    setActiveTabId,
    updateActiveTabContent,
    saveActiveTab,
    openTab,
    closeTab,
    closeDirty,
  } = useEditorTabs();

  const [lang, setLang] = useState<Extension | undefined>(undefined);

  useSaveShortcut(saveActiveTab);

  useEffect(() => {
    if (!activeTab) return;
    setLang(getLang(activeTab.lang));
  }, [activeTab]);

  return (
    <>
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        openTab={openTab}
        closeTab={closeTab}
        closeDirty={closeDirty}
      />
      {activeTab && (
        <CodeMirror
          key={activeTabId}
          value={activeTab.content}
          theme={vscodeDark}
          basicSetup={true}
          // avoid putting undefined into the extensions array
          extensions={lang ? [lang] : []}
          onChange={updateActiveTabContent}
        />
      )}
    </>
  );
}

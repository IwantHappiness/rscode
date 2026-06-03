import CodeMirror from "@uiw/react-codemirror";
import TabBar from "./components/TabBar";
import "./App.css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { rust } from "@codemirror/lang-rust";
import useEditorTabs from "./hooks/useEditorTabs";
import useSaveShortcut from "./hooks/useSaveShortcut";

export default function App() {
  const {
    tabs,
    activeTab,
    activeTabId,
    setActiveTabId,
    updateActiveTabContent,
    saveActiveTab,
    openTab,
    closeTab
  } = useEditorTabs();

  useSaveShortcut(saveActiveTab);

  return (
    <>
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        openTab={openTab}
        closeTab={closeTab}
      />
      {activeTab && (
        <CodeMirror
          key={activeTabId}
          value={activeTab.content}
          theme={vscodeDark}
          extensions={[rust()]}
          onChange={updateActiveTabContent}
        />
      )}
    </>
  );
}

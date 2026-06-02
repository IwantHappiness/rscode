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
  } = useEditorTabs();

  useSaveShortcut(saveActiveTab);

  return (
    <>
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
      />
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

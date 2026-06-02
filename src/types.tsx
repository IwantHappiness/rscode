export type EditorTab = {
  id: string;
  path: string;
  title: string;
  content: string;
  savedContent: string;
  isDirty: boolean;
};

export type TabBarProps = {
  tabs: EditorTab[];
  activeTabId: string | null;
  onSelectTab: (id: string) => void;
};

export type UseEditorTabsResult = {
  tabs: EditorTab[];
  activeTab: EditorTab | null;
  activeTabId: string | null;
  setActiveTabId: (id: string) => void;
  updateActiveTabContent: (content: string) => void;
  saveActiveTab: (activeTab: EditorTab) => Promise<void>;
};

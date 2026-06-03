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
  openTab: () => void;
  closeTab: (id: string) => void;
};

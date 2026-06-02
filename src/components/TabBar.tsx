import { TabBarProps } from "../types";

export default function TabBar({
  tabs,
  activeTabId,
  onSelectTab,
}: TabBarProps) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={tab.id === activeTabId ? "tab active" : "tab"}
          onClick={() => onSelectTab(tab.id)}
        >
          {tab.title === "" && tab.path === "" ? "Unnamed" : tab.title}
          {tab.isDirty ? (
            <span className="dirty-dot" />
          ) : (
            <span className="close-button"></span>
          )}
        </button>
      ))}
    </div>
  );
}

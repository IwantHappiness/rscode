import { TabBarProps } from "../types";

export default function TabBar({
  tabs,
  activeTabId,
  onSelectTab,
  openTab,
  closeTab,
  closeDirty
}: TabBarProps) {
  return (
    <>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTabId ? "tab active" : "tab"}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.title === "" && tab.path === "" ? "Unnamed" : tab.title}
            {tab.isDirty ? (
              <span className="dirty-dot" onClick={(e) => { e.stopPropagation(); closeDirty(tab.id) }} />
            ) : (
                <span className="close-button" onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }} />
            )}
          </button>
        ))}
        <span className="add-tab" onClick={() => openTab()} />
      </div>
    </>
  );
}

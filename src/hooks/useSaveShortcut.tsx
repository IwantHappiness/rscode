import { useEffect } from "react";

export default function useSaveShortcut(onSave: () => void | Promise<void>): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isSaveShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s";

      if (!isSaveShortcut) return;

      event.preventDefault();
      void onSave();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSave]);
}

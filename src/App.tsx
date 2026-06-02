import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { getFileContent, saveFile, getPath } from './fileOps';
import "./App.css"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { rust } from "@codemirror/lang-rust";

export default function App() {
  const [code, setCode] = useState("");
  const [path, setPath] = useState("");
  getPath().then((data) => { setPath(data ?? "") })

  useEffect(() => {
    async function loadFile() {
      const content: string | undefined = await getFileContent();
      setCode(content ?? "");
    };
    
    loadFile();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key === "s";
  
      if (!isSaveShortcut) return;
  
      event.preventDefault();
      saveFile(code);
    }
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [path, code]);
  
  return <CodeMirror value={code} height="100vh" theme={vscodeDark} extensions={[rust()]} onChange={(value) => setCode(value)} />;
}
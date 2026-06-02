import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { getFileContent } from './getFile';
import "./App.css"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { rust } from "@codemirror/lang-rust";

export default function App() {
  const [code, setCode] = useState("");

  useEffect(() => {
    async function loadFile() {
      const content: string | undefined = await getFileContent();
      setCode(content ?? "");
    };
    
    loadFile();
  }, []);
  
  return <CodeMirror value={code} height="100vh" theme={vscodeDark} extensions={[rust()]} />;
}
import CodeMirror from '@uiw/react-codemirror';
import "./App.css"
import { EditorView } from '@codemirror/view';

const myTheme = EditorView.theme({
  "&": {
    backgroundColor: "#1e1e1e", // Фон самого редактора
  },
  ".cm-gutters": {
    backgroundColor: "#1e1e1e", // Цвет боковушки
    color: "#5a5a5a",           // Цвет номеров строк
    border: "none",             // Убрать белую полосу/границу
  }
}, { dark: true });

export default function App() {
  return <CodeMirror value="" height="96vh" theme={myTheme} />;
}
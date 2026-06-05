import { Extension } from "@codemirror/state";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { go } from "@codemirror/lang-go";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { lezer } from "@codemirror/lang-lezer";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { less } from "@codemirror/lang-less";
import { sass } from "@codemirror/lang-sass";
import { clojure } from "@nextjournal/lang-clojure";
import { csharp } from "@replit/codemirror-lang-csharp";

const map: Record<string, Extension> = {
  cpp: cpp(),
  html: html(),
  java: java(),
  go: go(),
  js: javascript(),
  jsx: javascript({ jsx: true }),
  ts: javascript({ typescript: true }),
  tsx: javascript({ typescript: true, jsx: true }),
  json: json(),
  lezer: lezer(),
  md: markdown(),
  php: php(),
  py: python(),
  rs: rust(),
  sql: sql(),
  xml: xml(),
  less: less(),
  sass: sass(),
  clj: clojure(),
  cs: csharp(),
};

// Always return an Extension — fallback to markdown when unknown or not provided
export default function getLang(language: string): Extension {
  if (!language) return markdown();
  const lang = map[language];
  return lang ?? markdown();
}

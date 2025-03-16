import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("python");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Online Coding Platform</h2>
      <select
        className="border p-2 mb-2"
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="csharp">C#</option>
      </select>
      <Editor
        height="60vh"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default CodeEditor;

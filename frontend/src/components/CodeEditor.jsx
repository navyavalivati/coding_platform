import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { runCode } from "../api";

const CodeEditor = () => {
  const getDefaultCode = (lang) => {
    return lang === "python" ? "# Write your code here" : "// Write your code here";
  };
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(getDefaultCode(language));
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);
  
  const handleRunCode = async () => {
    setOutput("Executing...");
    const result = await runCode(code, language, userInput);
    setOutput(result);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "#f4f4f4"
      }}
    >
      <div style={{ flex: 0.65, display: "flex", flexDirection: "column", padding: "20px", background: "#1e1e1e", color: "white" }}>
        <h2 style={{ marginBottom: "10px" }}>Online Coding Platform</h2>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <select
            style={{
            padding: "10px",
            marginBottom: "10px",
            fontSize: "12px",
            background: "#333",
            color: "white",
            border: "1px solid #555"
          }}
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
        </select>
        </div>

        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px" }}>
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
            options={{ minimap: { enabled: false } }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <button
    style={{
      marginTop: "10px",
      padding: "10px 20px",
      background: "rgb(36 49 120)",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "12px"
    }}
    onClick={handleRunCode}
  >
    Run Code
  </button>
</div>
      </div>

      <div style={{ flex: 0.35, display: "flex", flexDirection: "column", padding: "20px", background: "#3c3c3c", color: "white" }}>
       
        <div style={{ flex: 0.25 }}>
          <h4>User Input</h4>
          <textarea
            style={{
              width: "90%",
              height: "90%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "12px",
              background: "#1e1e1e",
              color: "white"
            }}
            placeholder="Enter input values..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>

        <div style={{ flex: 0.55, marginTop: "60px" }}>
          <h4>Output</h4>
          <div
            style={{
              padding: "10px",
              background: "#333",
              color: "lime",
              whiteSpace: "pre-wrap",
              width: "70%%",
              height: "90%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "12px",
              overflowY: "auto"
            }}
          >
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

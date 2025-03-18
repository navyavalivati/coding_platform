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
  const [theme, setTheme] = useState("dark"); // Default to dark theme

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  const handleRunCode = async () => {
    setOutput("Executing...");
    const result = await runCode(code, language, userInput);
    setOutput(result);
  };

  // Define light and dark theme styles
  const themes = {
    dark: {
      background: "#1e1e1e",
      text: "white",
      editorTheme: "vs-dark",
      buttonBg: "#243178",
      panelBg: "#3c3c3c",
      inputBg: "#1e1e1e",
      borderColor: "#555",
      outputColor: "lime",
      selectBg: "#333",
      selectBorder: "#555",
    },
    light: {
      background: "#f4f4f4",
      text: "black",
      editorTheme: "vs-light",
      buttonBg: "#0056b3",
      panelBg: "#e0e0e0",
      inputBg: "#ffffff",
      borderColor: "#ccc",
      outputColor: "#1e1e1e",
      selectBg: "#f0f0f0",
      selectBorder: "#ccc",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: currentTheme.background,
        color: currentTheme.text,
        transition: "0.3s ease-in-out",
      }}
    >
      <div style={{ flex: 0.65, display: "flex", flexDirection: "column", padding: "20px", background: currentTheme.background }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h2>Online Coding Platform</h2>

          
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <select
            style={{
              padding: "10px",
              marginBottom: "10px",
              fontSize: "12px",
              background: currentTheme.selectBg,
              color: currentTheme.text,
              border: `1px solid ${currentTheme.selectBorder}`,
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

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              width: "40px", 
              height: "40px",
              marginLeft : "10px",
              background: currentTheme.selectBg,
              color: currentTheme.text,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center" 
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={{ flex: 1, border: `1px solid ${currentTheme.borderColor}`, borderRadius: "5px" }}>
          <Editor
            height="100%"
            width="100%"
            theme={currentTheme.editorTheme}
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
            options={{ minimap: { enabled: false } }}
          />
        </div>

        {/* Run Code Button (Right Aligned) */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: currentTheme.buttonBg,
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "12px",
            }}
            onClick={handleRunCode}
          >
            Run Code
          </button>
        </div>
      </div>

      {/* Right Panel (User Input & Output) */}
      <div style={{ flex: 0.35, display: "flex", flexDirection: "column", padding: "20px", background: currentTheme.panelBg }}>
        {/* User Input */}
        <div style={{ flex: 0.25 }}>
          <h4>User Input</h4>
          <textarea
            style={{
              width: "90%",
              height: "90%",
              padding: "10px",
              border: `1px solid ${currentTheme.borderColor}`,
              borderRadius: "5px",
              fontSize: "12px",
              background: currentTheme.inputBg,
              color: currentTheme.text,
            }}
            placeholder="Enter input values..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>

        {/* Output */}
        <div style={{ flex: 0.55, marginTop: "60px" }}>
          <h4>Output</h4>
          <div
            style={{
              padding: "10px",
              background: currentTheme.selectBg,
              color: currentTheme.outputColor,
              whiteSpace: "pre-wrap",
              width: "90%",
              height: "90%",
              border: `1px solid ${currentTheme.borderColor}`,
              borderRadius: "5px",
              fontSize: "12px",
              overflowY: "auto",
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

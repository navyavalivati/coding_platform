import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { runCode } from "../api";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("python");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [editorSize, setEditorSize] = useState({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.6
  });

  useEffect(() => {
    const handleResize = () => {
      setEditorSize({
        width: Math.max(window.innerWidth * 0.9, 600),  //min width of 600px
        height: Math.max(window.innerHeight * 0.6, 300) //min height of 300px
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRunCode = async () => {
    setOutput("Executing...");
    const result = await runCode(code, language, userInput); // call the api
    setOutput(result);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", background: "#f4f4f4", minHeight: "100vh" }}>
      <h2>Online Coding Platform</h2>

      {/* Language Selection Dropdown */}
      <select
        style={{ padding: "10px", marginBottom: "10px", fontSize: "16px" }}
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

      {/* Monaco Editor */}
      <div style={{ width: editorSize.width, height: editorSize.height, border: "1px solid #ccc", borderRadius: "5px", background: "#1e1e1e" }}>
        <Editor
          height={editorSize.height}
          width={editorSize.width}
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          options={{ minimap: { enabled: false } }}
        />
      </div>

      {/* User Input Box */}
      <textarea
        style={{ width: "90%", maxWidth: "1200px", height: "100px", marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        placeholder="Enter input values..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>

      {/* Run Code Button */}
      <button
        style={{ marginTop: "10px", padding: "10px 20px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontSize: "16px" }}
        onClick={handleRunCode}
      >
        Run Code
      </button>

      {/* Output Box */}
      <div style={{ marginTop: "10px", padding: "10px", background: "#333", color: "lime", whiteSpace: "pre-wrap", width: "90%", maxWidth: "1200px", minHeight: "100px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}>
        {output}
      </div>
    </div>
  );
};

export default CodeEditor;

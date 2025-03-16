import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
      </Routes>
    </Router>
  )
}

export default App;
import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import OutputPanel from './components/OutputPanel/OutputPanel';
import FileExplorer from './components/FileExplorer/FileExplorer';
import RunButton from './components/Runbutton/RunButton';
import './styles/App.css';

function App() {
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');

  // Function to handle code run
  const runCode = async () => {
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput('Error running code.');
    }
  };

  return (
    <div className="cloud-ide-container">
      <FileExplorer />
      <div className="main-content">
        <Editor code={code} setCode={setCode} />
        <RunButton runCode={runCode} />
        <OutputPanel output={output} />
      </div>
    </div>
  );
}

export default App;

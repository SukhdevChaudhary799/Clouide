import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import OutputPanel from './components/OutputPanel/OutputPanel';
import FileExplorer from './components/FileExplorer/FileExplorer';
import RunButton from './components/Runbutton/RunButton';
import './styles/App.css';

function App() {
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp'); // Default to C++

  // Function to handle code run
  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }), // Send language with code
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput('Error running code: ' + error.message);
    }
  };

  return (
    <div className="cloud-ide-container">
      <FileExplorer />
      <div className="main-content">
        <div className="controls">
          {/* Language Selector */}
          <label>
            Select Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
            </select>
          </label>
        </div>
        <Editor code={code} setCode={setCode} />
        <RunButton runCode={runCode} />
        <OutputPanel output={output} />
      </div>
    </div>
  );
}

export default App;

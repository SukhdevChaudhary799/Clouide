import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import OutputPanel from './components/OutputPanel/OutputPanel';
import FileExplorer from './components/FileExplorer/FileExplorer';
import RunButton from './components/Runbutton/RunButton';
import './styles/App.css';

function App() {
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python'); // Default language

  // Function to handle code run
  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }), // Include language in the request along with code
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput(`Error running code: ${error.message}`);
    }
  };

  return (
    <div className="cloud-ide-container">
      <FileExplorer />
      <div className="main-content">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Select Language:</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
            style={{ width: '150px' }} // Adjust width as needed
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <Editor code={code} setCode={setCode} />
        <RunButton runCode={runCode} />
        <OutputPanel output={output} />
      </div>
    </div>
  );
}

export default App;

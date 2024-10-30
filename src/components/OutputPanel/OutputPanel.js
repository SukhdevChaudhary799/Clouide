import React from 'react';

function OutputPanel({ output }) {
  return (
    <div className="output-panel">
      <h5>Output:</h5>
      <pre>{output}</pre>
    </div>
  );
}

export default OutputPanel;

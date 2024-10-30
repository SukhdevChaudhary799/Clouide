import React from 'react';
import MonacoEditor from '@monaco-editor/react';

function Editor({ code, setCode }) {
  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="editor">
      <MonacoEditor
        height="400px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default Editor;

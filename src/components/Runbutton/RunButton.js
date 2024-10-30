import React from 'react';
import { Button } from 'react-bootstrap';

function RunButton({ runCode }) {
  return (
    <Button variant="primary" onClick={runCode}>
      Run Code
    </Button>
  );
}

export default RunButton;

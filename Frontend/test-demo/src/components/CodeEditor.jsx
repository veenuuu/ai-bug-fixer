import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
      <Editor
        height="300px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}

export default CodeEditor;

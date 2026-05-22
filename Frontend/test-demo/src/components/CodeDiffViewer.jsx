import { DiffEditor } from "@monaco-editor/react";

function CodeDiffViewer({
  code,
  fixedCode,
  language,
}) {
  if (!fixedCode) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-400">
        Code Comparison
      </h2>

      <DiffEditor
        height="500px"
        original={code}
        modified={fixedCode}
        language={language}
        theme="vs-dark"
        options={{
          readOnly: true,
          renderSideBySide: true,
        }}
      />
    </div>
  );
}

export default CodeDiffViewer;

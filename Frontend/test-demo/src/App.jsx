import { useState } from "react";
import { Toaster } from "react-hot-toast";
import CodeEditor from "./components/CodeEditor";
import RepositoryUpload from "./components/RepositoryUpload";
import UploadSection from "./components/UploadSection";
import ResultSection from "./components/ResultSection";
import ValidationSection from "./components/ValidationSection";
import CodeDiffViewer from "./components/CodeDiffViewer";
import AIRepoAgent from "./components/AIRepoAgent";
import useBugFixer from "./hooks/useBugFixer";

function App() {
  const {
    code,
    setCode,
    runtimeError,
    fixedCode,
    explanation,
    fixValidation,
    validationOutput,
    validationError,
    loading,
    language,
    setLanguage,
    successMessage,
    repoUploadMessage,
    repoLoading,
    fixBug,
    uploadFile,
    uploadRepository,
    agentPrompt,
    agentResponse,
    agentLoading,
    runAgentTask,
    setAgentPrompt
  } = useBugFixer();

  const [selectedFile, setSelectedFile] = useState(null);
  const [repoFile, setRepoFile] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#fff",
              padding: "18px 24px",
              fontSize: "18px",
              borderRadius: "12px",
              fontWeight: "bold",
              minWidth: "350px",
              textAlign: "center",
            },
          }}
        />

        <div className="mb-10">
          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            AI Bug Fixer
          </h1>

          <p className="text-slate-400 text-xl mt-3">
            AI-powered debugging and intelligent code validation
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <div className="mb-4">
            <h2 className="text-xl mb-6 font-semibold">Paste Your Code</h2>

            <UploadSection
              language={language}
              setLanguage={setLanguage}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              uploadFile={uploadFile}
            />

            <RepositoryUpload
              repoFile={repoFile}
              setRepoFile={setRepoFile}
              repoUploadMessage={repoUploadMessage}
              repoLoading={repoLoading}
              uploadRepository={uploadRepository}
            />

            <AIRepoAgent
              agentPrompt={agentPrompt}
              setAgentPrompt={setAgentPrompt}
              runAgentTask={runAgentTask}
              agentLoading={agentLoading}
              agentResponse={agentResponse}
            />

            <CodeEditor code={code} setCode={setCode} language={language} />
          </div>
        </div>

        <button
          onClick={fixBug}
          className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-200 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl"
        >
          {loading ? "Fixing..." : "Fix Bug"}
        </button>

        <ResultSection
          successMessage={successMessage}
          runtimeError={runtimeError}
          explanation={explanation}
        />

        <CodeDiffViewer code={code} fixedCode={fixedCode} language={language} />

        <ValidationSection
          fixValidation={fixValidation}
          validationOutput={validationOutput}
          validationError={validationError}
        />
      </div>
    </div>
  );
}

export default App;

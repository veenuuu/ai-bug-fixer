function AIRepoAgent({
  agentPrompt,
  setAgentPrompt,
  runAgentTask,
  agentLoading,
  agentResponse,
}) {
  return (
    <>
      <div className="mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">AI Repository Agent</h2>

        <textarea
          value={agentPrompt}
          onChange={(e) => setAgentPrompt(e.target.value)}
          placeholder="Describe what you want the AI to fix..."
          className="w-full h-40 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white outline-none"
        />

        <button
          onClick={runAgentTask}
          className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
        >
          {agentLoading ? "Thinking..." : "Run AI Agent"}
        </button>
      </div>

      {agentResponse && (
        <div className="mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            Agent Analysis
          </h2>

          <pre className="whitespace-pre-wrap">{agentResponse}</pre>
        </div>
      )}
    </>
  );
}

export default AIRepoAgent;

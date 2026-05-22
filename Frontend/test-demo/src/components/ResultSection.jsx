function ResultSection({
  successMessage,
  runtimeError,
  explanation,
}) {
  return (
    <>
      {successMessage && (
        <div className="mt-6 bg-green-900 border border-green-500 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-green-300">✅ Success</h2>

          <p>{successMessage}</p>
        </div>
      )}

      {runtimeError && (
        <div className="mt-8">
          <h2 className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            Runtime Error
          </h2>

          <pre className="bg-black p-4 rounded overflow-auto">
            {runtimeError}
          </pre>
        </div>
      )}

      {explanation && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Explanation</h2>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            {explanation}
          </div>
        </div>
      )}
    </>
  );
}

export default ResultSection;

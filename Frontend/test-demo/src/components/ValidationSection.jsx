function ValidationSection({
  fixValidation,

  validationOutput,

  validationError,
}) {
  if (fixValidation === null) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Validation Result</h2>

      {fixValidation ? (
        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h3 className="text-green-300 text-xl font-bold">
            ✅ Fix Successful
          </h3>

          <pre className="mt-2 whitespace-pre-wrap">
            {validationOutput || "Code executed successfully"}
          </pre>
        </div>
      ) : (
        <div className="bg-red-900 border border-red-500 p-4 rounded-lg">
          <h3 className="text-red-300 text-xl font-bold">❌ Fix Failed</h3>

          <pre className="mt-2 whitespace-pre-wrap">{validationError}</pre>
        </div>
      )}
    </div>
  );
}

export default ValidationSection;

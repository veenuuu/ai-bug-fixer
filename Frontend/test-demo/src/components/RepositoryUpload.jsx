function RepositoryUpload({
  repoFile,
  setRepoFile,
  repoUploadMessage,
  repoLoading,
  uploadRepository,
}) {
  return (
    <div className="mb-6">
      <label className="block mb-3 text-lg font-semibold">
        Upload Repository ZIP
      </label>

      <input
        type="file"
        accept=".zip"
        onChange={(e) => setRepoFile(e.target.files[0])}
        className="bg-slate-800 p-3 rounded-lg w-full"
      />

      {repoUploadMessage && (
        <div className="mt-4 bg-purple-900 border border-purple-500 p-4 rounded-xl text-center">
          <h3 className="text-xl font-bold text-purple-300">
            {repoLoading ? "Indexing Repository..." : repoUploadMessage}
          </h3>
        </div>
      )}

      <button
        onClick={() => uploadRepository(repoFile)}
        className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
      >
        {repoLoading ? "Indexing..." : "Upload Repository"}
      </button>
    </div>
  );
}

export default RepositoryUpload;

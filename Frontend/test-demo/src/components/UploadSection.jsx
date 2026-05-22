import toast from "react-hot-toast";

function UploadSection({
  language,
  setLanguage,
  setSelectedFile,
  uploadFile,
  selectedFile,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <label className="block mb-2 text-slate-300 font-medium">
          Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-lg outline-none focus:border-blue-500"
        >
          <option value="python">Python</option>

          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-slate-300 font-medium">
          Upload File
        </label>

        <input
          type="file"
          accept=".py,.js"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
        />
      </div>

      <button
        onClick={async () => {
          await uploadFile(selectedFile);
          toast.success("File uploaded successfully!");
        }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-200 px-6 py-3 rounded-xl font-bold shadow-xl"
      >
        Upload Code File
      </button>
    </div>
  );
}

export default UploadSection;

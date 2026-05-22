import { useState } from "react";

import { fixBugAPI, uploadFileAPI, uploadRepositoryAPI } from "../services/api";

const useBugFixer = () => {
  const [code, setCode] = useState("");

  const [runtimeError, setRuntimeError] = useState("");

  const [fixedCode, setFixedCode] = useState("");

  const [explanation, setExplanation] = useState("");

  const [fixValidation, setFixValidation] = useState(null);

  const [validationOutput, setValidationOutput] = useState("");

  const [validationError, setValidationError] = useState("");

  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState("python");

  const [successMessage, setSuccessMessage] = useState("");

  const [repoUploadMessage, setRepoUploadMessage] = useState("");

  const [repoLoading, setRepoLoading] = useState(false);

  const fixBug = async () => {
    setRuntimeError("");
    setFixedCode("");
    setExplanation("");
    setFixValidation(null);
    setValidationOutput("");
    setValidationError("");
    setLoading(true);

    try {
      const response = await fixBugAPI({
        code,
        language,
      });

      if (response.data.success) {
        setRuntimeError("");
        setFixedCode("");
        setExplanation("");
        setFixValidation(true);

        setValidationOutput(
          response.data.output || "Code executed successfully",
        );

        setValidationError("");

        setSuccessMessage(
          response.data.message || "Bug fixed and code validated successfully!",
        );
      } else {
        setRuntimeError(response.data.runtime_error);

        setFixedCode(response.data.fixed_code);

        setExplanation(response.data.explanation);

        setFixValidation(response.data.fix_validation);

        setValidationOutput(response.data.validation_output);

        setValidationError(response.data.validation_error);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const uploadFile = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      const response = await uploadFileAPI(formData);

      setCode(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadRepository = async (repoFile) => {
    if (!repoFile) return;

    const formData = new FormData();

    formData.append("file", repoFile);

    try {
      setRepoLoading(true);

      const response = await uploadRepositoryAPI(formData);

      setRepoUploadMessage(
        `Repository Indexed Successfully | Files: ${response.data.indexed_files} | Chunks: ${response.data.total_chunks}`,
      );
    } catch (error) {
      console.log(error);

      setRepoUploadMessage("Repository upload failed");
    }

    setRepoLoading(false);
  };

  return {
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
  };
};

export default useBugFixer;

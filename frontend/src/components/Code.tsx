import * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
import axios from "axios";

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = "",
  onChange,
  setResult,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const languages = [
    { value: "javascript", label: "JavaScript", languageId: 63 },
    { value: "python", label: "Python", languageId: 72 },
    { value: "java", label: "Java", languageId: 62 },
    { value: "typescript", label: "TypeScript", languageId: 74 },
    // Add other languages with their corresponding Judge0 language IDs
  ];

  useEffect(() => {
    const editorContainer = document.getElementById("editor");
    if (editorContainer) {
      const newEditor = monaco.editor.create(editorContainer, {
        value: initialValue,
        language: selectedLanguage,
        theme: selectedTheme,
      });

      setEditor(newEditor);
      newEditor.onDidChangeModelContent(() => {
        const value = newEditor.getValue();
        onChange?.(value);
      });

      return () => newEditor.dispose();
    }
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedLanguage(value);
    const selectedLang = languages.find((lang) => lang.value === value);
    if (editor) {
      const model = editor.getModel();
      if (model && selectedLang) {
        monaco.editor.setModelLanguage(model, value);
      }
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTheme(value);
    monaco.editor.setTheme(value);
  };

  const handleRun = async () => {
    console.log("i am handke run ");
    if (!editor) return;

    const code = editor.getValue();
    const languageId = languages.find(
      (lang) => lang.value === selectedLanguage
    )?.languageId;

    console.log(languageId);
    try {
      const response = await axios.post("http://localhost:3000/judge0", {
        code,
        languageId,
      });
      console.log(response.data);
      console.log(response.data.output);
      setResult(response.data.output);
    } catch (error) {
      console.log("i am error while posting");
      console.error("Error executing code:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="mr-2">Language:</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-2 py-1 border rounded"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2">Theme:</label>
          <select
            value={selectedTheme}
            onChange={handleThemeChange}
            className="px-2 py-1 border rounded"
          >
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
            <option value="hc-black">High Contrast Dark</option>
          </select>
        </div>
        <button
          onClick={handleRun}
          className="px-4 py-1 border rounded-lg bg-blue-500 text-white"
        >
          Run
        </button>
      </div>
      <div
        id="editor"
        className="h-96 w-full border rounded-md overflow-hidden"
      />
    </div>
  );
};

export default CodeEditor;

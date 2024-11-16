import { useState } from "react";
import CodeEditor from "./components/Code";
import CodeOutput from "./components/Output";

function App() {
  const [codeOuput, setCodeOutput] = useState("");
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <CodeEditor setResult={setCodeOutput} />
      <CodeOutput output={codeOuput} />
    </div>
  );
}

export default App;

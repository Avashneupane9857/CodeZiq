import CodeEditor from "./components/Code";
import CodeOutput from "./components/Output";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <CodeEditor />
      <CodeOutput />
    </div>
  );
}

export default App;

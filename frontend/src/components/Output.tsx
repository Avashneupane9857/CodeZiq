const CodeOutput = ({ output }) => {
  return (
    <div className=" h-80 w-[90vh] bg-[#1e1e1e] rounded-lg mt-4">
      <div className="h-8 bg-[#252525] px-4 flex items-center">
        <span className="text-gray-300 text-sm">Output</span>
      </div>
      <div className="p-4 text-gray-200 font-mono h-[calc(100%-2rem)] overflow-auto">
        {output || "No Output Availabe"}
      </div>
    </div>
  );
};

export default CodeOutput;

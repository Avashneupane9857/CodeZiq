import axios from "axios";

export const Judge0_Exec = async (req: any, res: any) => {
  const { code, languageId } = req.body;
  
  if (!code || !languageId) {
    return res.status(400).json({ msg: "Please provide both code and languageId." });
  }
  
  console.log("Code:", code);
  console.log("Language ID:", languageId);
  
  const RAPIDAPI_KEY = "ee9802bac2mshc19335451bfac76p1217ccjsn09eaf5790b55";
  const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
  
  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Host": RAPIDAPI_HOST,
    "X-RapidAPI-Key": RAPIDAPI_KEY,
  };

  try {
    const submission = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        source_code: code,
        language_id: languageId,
      },
      { headers }
    );

    if (!submission.data.token) {
      return res.status(400).json({ msg: "Failed to get submission token." });
    }

    const token = submission.data.token;
    
    let maxAttempts = 10;
    let attempts = 0;
    let result;
    
    while (attempts < maxAttempts) {
      try {
        const response = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          { headers }
        );
        
        result = response.data;
        
        if (result.status.id === 3) { 
          return res.status(200).json({
            msg: "Code executed successfully",
            lang: languageId,
            data: result,
            output: result.stdout || result.compile_output || "No output",
          });
        }
        
        if (result.status.id <= 2) {
          await new Promise(resolve => setTimeout(resolve, 1000)); 
          attempts++;
          continue;
        }
        
        return res.status(400).json({
          msg: "Code execution failed",
          status: result.status,
          error: result.stderr || result.compile_output || "Unknown error",
        });
      } catch (pollError) {
        console.error("Error polling for results:", pollError);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return res.status(408).json({ msg: "Timeout while waiting for code execution." });
    
  } catch (e) {
    console.error("Error executing code:", e);
    return res.status(500).json({ msg: "Error occurred while executing the code." });
  }
};
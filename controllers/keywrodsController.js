const { spawn } = require('child_process');
const path = require("path");

//@desc Get all keywordds
//@route GET /keywords
//@access Private
const getAllKeywords = async (req, res) => {
  let data = req.body.text;

  if (!data) {
    console.log("There is not available data for processing.")
    return res.status(204).json({ message: "There is not available text for processing." });
  }
  const scriptPath = path.join(__dirname, 'extract_keywords_from_text.py');
  const pythonProcess = spawn('python', [scriptPath]);

  let pythonResponse = '';
  let pythonError = '';

  // Handle Python script's stdout
  pythonProcess.stdout.on('data', (data) => {
    pythonResponse += data.toString();
  });

  // Print out any errors from python scrip
  pythonProcess.stderr.on('data', (data) => {
    pythonError += data.toString();
  });

  // Handle Python script's exit
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Python script executed successfully');
      console.log('Python response:', pythonResponse);

      try {
        const parsedResponse = JSON.parse(pythonResponse);
        res.json({keywords: parsedResponse })
      } catch (error) {
        console.error('Error parsing Python response:', error);
      }
    } else {
      console.error('Python script execution failed');
      console.error('Python error:', pythonError);
    }
  });
  
  // Send data to Python script
  pythonProcess.stdin.write(JSON.stringify(data));
  pythonProcess.stdin.end();
};



module.exports = {
  getAllKeywords
}
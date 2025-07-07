import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { parseResumeWithLlama } from "./jobfinderai.js";
import { parsePdf } from "./parsePdf.js";
import { recommendJobs } from "./JobRecommender.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("resume"), async (req, res) => {
  const file = req.file;

  if (!file) {
    console.error(" No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = `${Date.now()}-${file.originalname}`;

  
  let uploadResponse;
  try {
    uploadResponse = await supabase.storage
      .from("resumes")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadResponse.error) throw uploadResponse.error;
  } catch (uploadError) {
    console.error("Upload error:", uploadError);
    return res.status(500).json({ error: "Failed to upload file" });
  }

  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/resumes/${uploadResponse.data.path}`;


  let parsedText = "";
  try {
    parsedText = await parsePdf(file.buffer);
    console.log(" PDF parsed, preview:", parsedText.slice(0, 200));
  } catch (pdfErr) {
    console.error(" PDF Parsing Error:", pdfErr);
    return res.status(500).json({ error: "Failed to parse PDF file" });
  }

  
  let llamaData;
  try {
    llamaData = await parseResumeWithLlama(parsedText);
    if (!llamaData) throw new Error("LLaMA response is null");
  } catch (llamaErr) {
    console.error(" LLaMA Parsing Error:", llamaErr);
    return res.status(500).json({ error: "Failed to parse resume with LLaMA" });
  }
     const jobs = recommendJobs(llamaData);
  
  return res.status(200).json({
    message: "Upload and parse successful",
    url: publicUrl,
    parsed: llamaData,
    jobs,
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

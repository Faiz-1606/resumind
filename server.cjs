
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

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
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = `${Date.now()}-${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("resumes")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }

  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/resumes/${data.path}`;
  res.status(200).json({ message: "Upload successful", url: publicUrl });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

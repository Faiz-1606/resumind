
import axios from "axios";

export async function parseResumeWithLlama(text) {
  const prompt = `
From the following resume text, extract:
1. A list of technical skills.
2. Job roles or titles.
3. A short 1-line career summary.
4. Based on the skills, infer a job domain like "Web Development", "Software Development", "AI/ML", "Data Analytics", "DevOps", etc.
5. Extract the candidate's location, city, or preferred work location from the resume
 Return the result as a JSON object:
{
  "skills": [],
  "roles": [],
  "summary": "",
  "domain": "",
  "location": ""
}
Only return a valid JSON object without any explanation or extra text.
Resume:
${text}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", 
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:4000", 
          "X-Title": "Resume Parser",
        },
      }
    );

    const result = response.data.choices[0].message.content;


const jsonMatch = result.match(/\{[\s\S]*?\}/);

if (!jsonMatch) {
  console.error("No JSON block found in LLaMA response:", result);
  return null;
}

try {
  return JSON.parse(jsonMatch[0]);
} catch (parseError) {
  console.error("Failed to parse JSON from LLaMA:", parseError);
  return null;
}

  } catch (err) {
    console.error(" Resume Parsing Error:", err.message);
    return null;
  }
}


import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function recommendJobs(parsedData) {
  if (!parsedData || !parsedData.skills || !Array.isArray(parsedData.skills)) return [];
  const location = parsedData.location || "";
  const query =
    parsedData.domain ||
    (parsedData.roles && parsedData.roles[0]) ||
    (parsedData.skills && parsedData.skills.slice(0, 5).join(" ")) ||
    "developer";

  console.log("Querying JSearch with:", query);
   if (location) {
    params.query = `${query} in ${location}`; 
  }
  try {
    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query,
        page: "1",
        num_pages: "1"
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    const jobs = response.data.data;
    console.log("JSearch results:", jobs.length);

    return jobs.map((job) => ({
      title: job.job_title,
      company: job.employer_name,
      description: job.job_description,
      location: job.job_city,
      url: job.job_apply_link
    }));
  } catch (err) {
    console.error("JSearch API Error:", err.response?.data || err.message);
    return [];
  }
}

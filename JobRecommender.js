const jobDataset = [
  {
    title: "Frontend Developer",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    description: "Build UI components using React.js and maintain responsive design."
  },
  {
    title: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Develop RESTful APIs and server-side logic."
  },
  {
    title: "Data Analyst",
    skills: ["Python", "SQL", "Pandas"],
    description: "Analyze and visualize data to help decision-making."
  },
  {
    title: "AI/ML Engineer",
    skills: ["Python", "TensorFlow", "PyTorch"],
    description: "Build machine learning models and optimize performance."
  },
];

export  function recommendJobs(parsedData) {
  if (!parsedData || !parsedData.skills) return [];

  const resumeSkills = parsedData.skills.map(skill => skill.toLowerCase());
  const recommendations = [];

  for (const job of jobDataset) {
    const matchCount = job.skills.filter(skill =>
      resumeSkills.includes(skill.toLowerCase())
    ).length;

    if (matchCount > 0) {
      recommendations.push({
        title: job.title,
        description: job.description,
        matchScore: matchCount / job.skills.length
      });
    }
  }

  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}



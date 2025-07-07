const JobCard = ({ job }) => {
  return (
    <div className="bg-white/10 border border-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-yellow-300">{job.title}</h2>
      <p className="text-sm text-gray-300">{job.company}</p>
      <p className="text-sm text-gray-400">{job.location}</p>
      {job.url && (
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-300 underline text-sm mt-2 block"
        >
          Apply
        </a>
      )}
    </div>
  );
};


export default JobCard;

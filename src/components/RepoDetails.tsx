import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const RepoDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const repo = location.state?.repo;

  return (
    <>
      <Navbar />
      {!repo && <div>No repository data available.</div>}
      <div className="justify-self-center p-8 bg-gray-200/10 m-2 max-w-[90vw] rounded">
        <p className="mb-4 repo-name text-2xl break-words">
          Title: {repo.name}
        </p>
        <p className="repo-description">
          {" "}
          Description: {repo.description || "No description"}
        </p>
        <p className="repo-open-issues">Open Issues: {repo.open_issues}</p>
        <p className="repo-watchers">Watchers: {repo.watchers}</p>
        <p className="repo-forks">Forks: {repo.forks}</p>
        <p className="repo-languages">
          Languages:{" "}
          {repo.languages
            ? Object.keys(repo.languages).join(", ")
            : "Loading..."}
        </p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on GitHub
        </a>
      </div>
      <div className="justify-self-center">
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded back-button"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default RepoDetails;

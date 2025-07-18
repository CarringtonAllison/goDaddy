import Navbar from "./components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const RepoDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const repo = location.state?.repo;

  return (
    <>
      <Navbar />
      {!repo && <div>No repository data available.</div>}
      <div className="justify-self-center p-8 bg-gray-200/10 m-2 rounded">
        <h1 className="text-3xl mb-4">Title: {repo.name}</h1>
        <p> Description: {repo.description || "No description"}</p>
        <p>Open Issues: {repo.open_issues}</p>
        <p>Watchers: {repo.watchers}</p>
        <p>Forks: {repo.forks}</p>
        <p>
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
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default RepoDetails;

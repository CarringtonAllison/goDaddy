import { useNavigate } from "react-router-dom";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  forks_url: string;
  description?: string | null;
  open_issues: number;
  watchers: number;
  forks: number;
  languages?: Record<string, number>;
};

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const navigate = useNavigate();

  return (
    <li
      className="bg-gray-200/10 m-2 p-4 content-center roundedc transition delay-75 duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500/60 repo-card"
      onClick={() => navigate("/repodetails", { state: { repo } })}
    >
      <div className="flex justify-between ">
        <div className="repo-name">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-3   xl hover:underline"
          >
            {repo.name}
          </a>
        </div>
        <div className="flex text-xs sm:text-sm text-gray-500 md:text">
          <div className="px-2 my-1 repo-open-issues">
            Open Issues: {repo.open_issues}{" "}
          </div>
          <div className="px-2 my-1 repo-watchers">
            Watchers: {repo.watchers}{" "}
          </div>
          <div className="px-2 my-1 repo-forks">Forks: {repo.forks}</div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 my-1 repo-description">
          {repo.description ? repo.description : "No Description"}
        </div>
        <div className="w-1/2 my-1 justify-items-end text-right repo-languages">
          <div>
            {repo.languages
              ? Object.keys(repo.languages).join(", ")
              : "Loading..."}
          </div>
        </div>
      </div>
    </li>
  );
};

export default RepoCard;

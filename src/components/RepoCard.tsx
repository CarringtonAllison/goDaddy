type Repo = {
  id: number;
  name: string;
  html_url: string;
  forks_url: string;
  description: string | null;
  open_issues: number;
  watchers: number;
  forks: number;
  languages?: Record<string, number>;
};

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => (
  <li className="bg-gray-200/10 m-2 p-4 content-center">
    <div className="flex justify-between ">
      <div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-3xl hover:underline"
        >
          {repo.name}
        </a>
      </div>
      <div className="flex text-sm text-gray-600">
        <div className="px-2 my-1">Open Issues: {repo.open_issues} </div>
        <div className="px-2 my-1">Watchers: {repo.watchers} </div>
        <div className="px-2 my-1">
          Forks:{" "}
          <a
            href={repo.forks_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {repo.forks}
          </a>
        </div>
      </div>
    </div>
    <div className="flex">
      <div className="w-1/2 my-1">
        {repo.description ? repo.description : "No Description"}
      </div>
      <div className="w-1/2 my-1 justify-items-end">
        <div>
          {repo.languages
            ? Object.keys(repo.languages).join(", ")
            : "Loading..."}
        </div>
      </div>
    </div>
  </li>
);

export default RepoCard;

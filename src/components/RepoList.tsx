import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

const RepoList = () => {
  type Repo = {
    id: number;
    name: string;
    html_url: string;
    forks_url: string;
    languages_url: string;
    description: string | null;
    open_issues: number;
    watchers: number;
    forks: number;
    languages?: Record<string, number>;
  };

  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getRepos = async () => {
    try {
      const response = await fetch("https://api.github.com/orgs/godaddy/repos");
      if (!response.ok) {
        if (response.status === 403) {
          setError("GitHub API rate limit exceeded. Please try again later.");
          return [];
        } else {
          setError("Failed to fetch repositories.");
          return [];
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError("An error occurred while fetching repositories.");
      console.error("Fetch error:", error);
    }
    return [];
  };

  const getLanguages = async (repo: Repo) => {
    const response = await fetch(repo.languages_url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getRepos()
      .then((data) => {
        setRepos(data);
        data.forEach(async (repo: Repo) => {
          try {
            const languages = await getLanguages(repo);
            setRepos((prevRepos) =>
              prevRepos.map((r) => (r.id === repo.id ? { ...r, languages } : r))
            );
          } catch (error) {
            console.error(
              `Error fetching languages for repo ${repo.name}:`,
              error
            );
          }
        });
      })
      .catch((error) => console.error("Error fetching repos:", error));
  }, []);

  return (
    <>
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      <ul className="flex flex-col m-5 justify-self-center max-h-screen max-w-3/4 overflow-y-auto">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </>
  );
};

export default RepoList;

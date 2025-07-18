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

  const getLanguages = async (repo: Repo) => {
    const response = await fetch(repo.languages_url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  const loadRepos = async () => {
    const cachedRepos = localStorage.getItem("godaddy_repos");
    if (cachedRepos) {
      const parsedRepos = JSON.parse(cachedRepos);
      const allHaveLanguages = parsedRepos.every(
        (repo: Repo) => repo.languages
      );
      if (allHaveLanguages) {
        setRepos(parsedRepos);
        return;
      }
    }

    try {
      const response = await fetch("https://api.github.com/orgs/godaddy/repos");
      if (!response.ok) {
        if (response.status === 403) {
          setError("GitHub API rate limit exceeded. Please try again later.");
          return;
        } else {
          setError("Failed to fetch repositories.");
          return;
        }
      }
      const data = await response.json();

      const reposWithLangs = await Promise.all(
        data.map(async (repo: Repo) => {
          try {
            const languages = await getLanguages(repo);
            return { ...repo, languages };
          } catch {
            return { ...repo, languages: {} };
          }
        })
      );

      setRepos(reposWithLangs);
      localStorage.setItem("godaddy_repos", JSON.stringify(reposWithLangs));
    } catch (error) {
      setError("An error occurred while fetching repositories.");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <>
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      <ul className="flex flex-col m-5 justify-self-center max-h-[75vh] max-w-3/4 overflow-y-auto overflow-x-hidden rounded-3xl">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </>
  );
};

export default RepoList;

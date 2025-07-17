import { useEffect, useState } from "react";
import "./App.css";

function App() {
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

  const getRepos = async () => {
    const response = await fetch("https://api.github.com/orgs/godaddy/repos");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
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
      .then(async (data) => {
        // Fetch languages for each repo at the same time
        const reposWithLangs = await Promise.all(
          data.map(async (repo: Repo) => {
            const languages = await getLanguages(repo);
            return { ...repo, languages };
          })
        );
        setRepos(reposWithLangs);
      })
      .catch((error) => console.error("Error fetching repos:", error));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl">GoDaddy!</h1>
        <ul className="list-disc pl-5">
          {repos.map((repo) => (
            <li key={repo.id} className="my-2">
              Repo:{" "}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {repo.name}
              </a>
              <div className="my-1"> Description: {repo.description}</div>
              <div className="my-1">
                Languages:{" "}
                {repo.languages
                  ? Object.keys(repo.languages).join(", ")
                  : "Loading..."}
              </div>{" "}
              <div className="my-1">
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
              <div className="my-1">Open Issues: {repo.open_issues} </div>
              <div className="my-1">Watchers: {repo.watchers} </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

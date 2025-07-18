import RepoList from "./components/RepoList";

function App() {
  return (
    <div className="fixed inset-0 p-8">
      <div className="sticky top-0 justify-items-center">
        <h1 className="text-5xl">GoDaddy!</h1>
        <h2 className="text-xl">Repositories</h2>
      </div>
      <RepoList />
    </div>
  );
}

export default App;

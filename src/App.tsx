import Navbar from "./components/Navbar";
import RepoList from "./components/RepoList";

function App() {
  return (
    <div className="fixed inset-0">
      <Navbar />
      <RepoList />
    </div>
  );
}

export default App;

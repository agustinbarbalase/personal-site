import { useState, useEffect, Suspense } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/repos")
      .then((res) => res.json())
      .then((res) => setProjects(res))
      .catch((err) => console.error(err));
  }, []);

  if(projects === null) {
    return (
      <div className="loading">
        Loading ...
      </div>
    )
  }

  return (
    <div className="App">
      <nav className="navbar">
        <h2>Agustín Barbalase</h2>
      </nav>
      <header className="header">
        <h1 className="header-title">Agustín Barbalase</h1>
      </header>
      <section className="projects">
        <h2 className="project-title">Projects</h2>
        <div className="project-board">
          {projects.map((item) => {
            return (
              <article className="project-item" key={item.id}>
                <h2 className="project-item-title">{item.name}</h2>
                <p className="project-item-description">{item.description}</p>
                <a
                  className="project-item-link"
                  href={item.url}
                  target="_blank"
                >
                  View repository
                </a>
              </article>
            );
          })}
        </div>
      </section>
      <footer className="footer">
        <a rel="license" href="http://localhost:3001/license">
          Copyright &copy; | MIT License
        </a>
      </footer>
    </div>
  );
}

export default App;

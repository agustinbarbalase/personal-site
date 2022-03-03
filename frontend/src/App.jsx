import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Home = () => {
  const [projects, setProjects] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch("/api/repos")
      .then((res) => res.json())
      .then((res) => setProjects(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((res) => setContact(res))
      .catch((err) => console.error(err));
  }, []);

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
          {projects &&
            projects.map((item) => {
              return (
                <article className="project-item" key={item.id}>
                  <h2 className="project-item-title">{item.name}</h2>
                  <p className="project-item-description">{item.description}</p>
                  <a
                    className="project-item-link"
                    href={item.url}
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    View repository
                  </a>
                </article>
              );
            })}
        </div>
      </section>
      <section className="contact">
        <h2 className="contact-title">Contact</h2>
        <div className="contact-board">
          {contact &&
            contact.map((item, index) => {
              return (
                <a
                  href={item.url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="contact-item"
                  key={`${item.name}-${index}`}
                >
                  <img className="contact-item-img" src={item.logo} />
                </a>
              );
            })}
        </div>
      </section>
      <footer className="footer">
        <a rel="license" href="/api/license">
          Copyright &copy; | MIT License
        </a>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
  );
}

export default App;

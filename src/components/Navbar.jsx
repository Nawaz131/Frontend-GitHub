import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState([]);
  const [showIssueDropdown, setShowIssueDropdown] = useState(false);

  useEffect(() => {
    async function fetchRepositories() {
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `https://github-backend-3.onrender.com/repo/user/${userId}`,
        );

        const data = await response.json();
        setRepositories(data.repositories || []);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRepositories();
  }, []);

  return (
    <nav className="github-navbar">
      <div className="navbar-left">
        <button className="nav-square-btn">☰</button>

        <Link to="/">
          <img
            className="github-logo"
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
          />
        </Link>

        <Link to="/" className="dashboard-link">
          Dashboard
        </Link>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Type / to search" />
        </div>

        {/* Create Repository */}
        <Link to="/create">
          <button className="nav-square-btn">
            <i className="bi bi-plus-square"></i>
          </button>
        </Link>

        <Link to="/issues">
          <button className="nav-square-btn">
            <i className="bi bi-record-circle"></i>
          </button>
        </Link>

        <Link to="/pull-requests">
          <button
            type="button"
            className="nav-square-btn"
            title="All pull requests"
          >
            <i className="bi bi-git"></i>
          </button>
        </Link>

        <div className="navbar-issue-wrapper">
          <button
            className="nav-square-btn"
            onClick={() => setShowIssueDropdown((prev) => !prev)}
          >
            <i className="bi bi-journal-text"></i>
          </button>

          {showIssueDropdown && (
            <div className="navbar-issue-dropdown">
              <h4>Select Repository</h4>

              {repositories.length === 0 ? (
                <p className="navbar-no-repo">No repositories found</p>
              ) : (
                repositories.map((repo) => (
                  <button
                    key={repo._id}
                    className="navbar-repo-option"
                    onClick={() => {
                      setShowIssueDropdown(false);
                      navigate(`/repository/${repo._id}/issues`);
                    }}
                  >
                    📁 {repo.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <Link to="/profile">
          <div className="profile-avatar">
            <i className="bi bi-person-circle"></i>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

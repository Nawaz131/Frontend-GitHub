// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav>
//       <Link to="/">
//         <div>
//           <img
//             src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
//             alt="GitHub logo"
//           />
//           <h3>GitHub</h3>
//         </div>
//       </Link>
//       <div>
//         <Link to="/create">
//           <p>Create a Repository</p>
//         </Link>
//         <Link to="/profile">
//           <p>Profile</p>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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
            alt="GitHub logo"
          />
        </Link>

        <Link to="/" className="dashboard-link">
          Dashboard
        </Link>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <span>
            <i className="bi bi-search"></i>
          </span>
          <input type="text" placeholder="Type / to search" />
        </div>

        <Link to="/create">
          <button className="nav-square-btn">
            <i className="bi bi-plus-square"></i>
          </button>
        </Link>

        <Link to="/issues">
          <button type="button" className="nav-square-btn" title="All issues">
            <i className="bi bi-record-circle"></i>
          </button>
        </Link>

        <button className="nav-square-btn">
          <i className="bi bi-git"></i>
        </button>

        <div className="issue-dropdown-container">
          <button
            className="nav-square-btn"
            onClick={() => setShowIssueDropdown(!showIssueDropdown)}
          >
            <i className="bi bi-journal-text"></i>
          </button>

          {showIssueDropdown && (
            <div className="issue-dropdown">
              <h4>Select Repository</h4>

              {repositories.map((repo) => (
                <div
                  key={repo._id}
                  className="issue-item"
                  onClick={() => {
                    setShowIssueDropdown(false);
                    navigate(`/repository/${repo._id}/issues`);
                  }}
                >
                  📁 {repo.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="nav-square-btn">
          <i className="bi bi-inbox"></i>
        </button>

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


import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
            <i class="bi bi-search"></i>
          </span>
          <input type="text" placeholder="Type / to search" />
        </div>

        <Link to="/create">
          <button className="nav-square-btn">
            <i class="bi bi-plus-square"></i>
          </button>
        </Link>

        <button className="nav-square-btn">
          <i class="bi bi-record-circle"></i>
        </button>

        <button className="nav-square-btn">
          <i className="bi bi-git"></i>
        </button>

        <button className="nav-square-btn">
          <i class="bi bi-journal-text"></i>
        </button>

        <button className="nav-square-btn">
          <i class="bi bi-inbox"></i>
        </button>

        <Link to="/profile">
          <div className="profile-avatar">
            <i class="bi bi-person-circle"></i>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
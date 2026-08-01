import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      if (!userId) {
        setRepositories([]);
        return;
      }

      try {
        const response = await fetch(
          `https://github-backend-3.onrender.com/repo/user/${userId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user repositories");
        }

        const data = await response.json();

        setRepositories(Array.isArray(data) ? data : data.repositories || []);
      } catch (error) {
        console.error("User repository error:", error);
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(
          "https://github-backend-3.onrender.com/repo/all",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggested repositories");
        }

        const data = await response.json();

        setSuggestedRepositories(
          Array.isArray(data) ? data : data.repositories || [],
        );
      } catch (error) {
        console.error("Suggested repository error:", error);
        setSuggestedRepositories([]);
      }
    };

    const loadDashboard = async () => {
      setLoading(true);

      await Promise.all([fetchRepositories(), fetchSuggestedRepositories()]);

      setLoading(false);
    };

    loadDashboard();
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return repositories;
    }

    return suggestedRepositories.filter((repo) =>
      repo.name?.toLowerCase().includes(query),
    );
  }, [searchQuery, suggestedRepositories]);

  const trendingRepositories = suggestedRepositories
    .filter(
      (suggestedRepo) =>
        !repositories.some((userRepo) => userRepo._id === suggestedRepo._id),
    )
    .slice(0, 5);

  return (
    <>
      <Navbar />
      <section className="github-dashboard">
        <aside className="dashboard-left">
          <div className="left-heading">
            <h3>Top repositories</h3>

            <button
              type="button"
              className="new-repository-button"
              onClick={() => navigate("/create")}
            >
              <span>▣</span>
              New
            </button>
          </div>

          <input
            type="text"
            className="repository-search"
            placeholder="Find a repository..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <div className="top-repository-list">
            {loading ? (
              <p className="dashboard-message">Loading repositories...</p>
            ) : searchResults.length > 0 ? (
              searchResults.slice(0, 7).map((repo) => (
                <button
                  type="button"
                  className="top-repository-item"
                  key={repo._id}
                >
                  <span className="small-avatar">
                    {repo.name?.charAt(0).toUpperCase() || "R"}
                  </span>

                  <span className="top-repository-name">
                    Nawaz131/{repo.name}
                  </span>
                </button>
              ))
            ) : (
              <p className="dashboard-message">No repositories found.</p>
            )}
          </div>

          {repositories.length > 7 && (
            <button type="button" className="show-more-button">
              Show more
            </button>
          )}

          <div className="recent-activity">
            <h3>Recent activity</h3>

            <div className="recent-activity-box">
              <p>
                When you take actions such as creating repositories, issues and
                pull requests, they will appear here.
              </p>
            </div>
          </div>
        </aside>

        <main className="dashboard-center">
          <h1>Home</h1>

          <section className="copilot-card">
            <textarea
              placeholder="Ask anything or type @ to add context"
              aria-label="Ask anything"
            />

            <div className="copilot-footer">
              <div className="copilot-options">
                <div className="ask-menu-wrapper">
  <button
    type="button"
    className="ask-menu-btn"
    onClick={() => setShowAskMenu((prev) => !prev)}
  >
    <span>▢</span>
    {askMode} ▼
  </button>

  {showAskMenu && (
    <div className="ask-popup">
      <button
        type="button"
        className="ask-option"
        onClick={() => {
          setAskMode("Ask");
          setShowAskMenu(false);
        }}
      >
        ✓ Ask
      </button>

      <button
        type="button"
        className="ask-option"
        onClick={() => {
          setAskMode("Agent");
          setShowAskMenu(false);
        }}
      >
        ☁ Agent
      </button>
    </div>
  )}
</div>

                <div className="repo-dropdown-container">
                  <button
                    className="repo-btn"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    All repositories ▼
                  </button>

                  {showDropdown && (
                    <div className="repo-dropdown">
                      {repositories.map((repo) => (
                        <div
                          key={repo._id}
                          className="repo-item"
                          onClick={() => navigate(`/repository/${repo._id}`)}
                        >
                          📁 {repo.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="small-square-button"
                  onClick={() => navigate("/create")}
                >
                  +
                </button>
              </div>

              <div className="copilot-actions">
                <span>Auto</span>
                <button type="button" aria-label="Submit question">
                  ➤
                </button>
              </div>
            </div>
          </section>

          <div className="quick-actions">
            <button type="button">
              <span>☁</span>
              Agent
            </button>

            <button
              type="button"
              onClick={() => {
                if (repositories.length > 0) {
                  navigate(`/repository/${repositories[0]._id}/issues/create`);
                } else {
                  alert("Please create a repository first");
                }
              }}
            >
              <span>◌</span>
              Create issue
            </button>

            <button type="button">
              <span>⑂</span>
              Pull requests
            </button>
          </div>

          <div className="feed-heading">
            <h3>Feed</h3>

            <button type="button" className="filter-button">
              ☰ Filter
            </button>
          </div>

          <section className="feed-card">
            <div className="feed-card-heading">
              <p>
                <span>⌁</span>
                My repositories
              </p>
            </div>

            {loading ? (
              <p className="feed-loading">Loading repositories...</p>
            ) : repositories.length > 0 ? (
              repositories
                .slice()
                .reverse()
                .slice(0, 5)
                .map((repo) => (
                  <article className="trending-repository" key={repo._id}>
                    <div className="trending-repository-content">
                      <div className="repository-owner">
                        <span className="feed-avatar">
                          {repo.name?.charAt(0).toUpperCase() || "R"}
                        </span>

                        <h3>Nawaz Hussain/{repo.name}</h3>
                      </div>

                      <p className="trending-description">
                        {repo.description || "No description available"}
                      </p>

                      <div className="trending-details">
                        <span>
                          <span className="language-circle"></span>
                          JavaScript
                        </span>

                        <span>
                          {repo.visibility === false ? "Private" : "Public"}
                        </span>
                      </div>
                    </div>

                    <button type="button" className="star-button">
                      ☆ Star
                    </button>
                  </article>
                ))
            ) : (
              <div className="empty-feed">
                <h3>No repositories found</h3>
                <p>Create a repository to see it here.</p>
              </div>
            )}
          </section>
        </main>

        <aside className="dashboard-right">
          <section className="changelog-card">
            <h3>Latest from our changelog</h3>

            <div className="changelog-item">
              <span className="changelog-dot"></span>

              <div>
                <small>16 hours ago</small>
                <p>Repository dashboard design is now available</p>
              </div>
            </div>

            <div className="changelog-item">
              <span className="changelog-dot"></span>

              <div>
                <small>18 hours ago</small>
                <p>Improved repository search functionality</p>
              </div>
            </div>

            <div className="changelog-item">
              <span className="changelog-dot"></span>

              <div>
                <small>19 hours ago</small>
                <p>Frontend connected with the deployed backend</p>
              </div>
            </div>

            <div className="changelog-item">
              <span className="changelog-dot"></span>

              <div>
                <small>20 hours ago</small>
                <p>Mobile dashboard improvements released</p>
              </div>
            </div>

            <button type="button" className="view-changelog">
              View changelog →
            </button>
          </section>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;

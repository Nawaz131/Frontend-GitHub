// import React, { useState, useEffect } from "react";
// import "./dashboard.css";
// import Navbar from "../Navbar";

// const Dashboard = () => {
//   const [repositories, setRepositories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     // Data fetching
//     const fetchRepositories = async () => {
//       try {
//         const response = await fetch(
//           `https://github-backend-3.onrender.com/repo/user/${userId}`   //change url local(localhost:3002) to live server
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch repositories");
//         }

//         const data = await response.json();

//         // console.log(data);

//         setRepositories(data.repositories || []);
//       } catch (err) {
//         console.log("Error while fetching repositories", err);
//         setRepositories([]);
//       }
//     };

//     // Searching repositories of all data
//     const fetchSuggestedRepositories = async () => {
//       try {
//         const response = await fetch(
//           `https://github-backend-3.onrender.com/repo/all`              //change url(localhost) local to live server
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch suggested repositories");
//         }

//         const data = await response.json();

//         // console.log(data);

//         setSuggestedRepositories(data.repositories || data || []);
//       } catch (err) {
//         console.log("Error while fetching repositories", err);
//         setSuggestedRepositories([]);
//       }
//     };

//     if (userId) {
//       fetchRepositories();
//     }

//     fetchSuggestedRepositories();
//   }, []);

//   useEffect(() => {
//     if (searchQuery === "") {
//       setSearchResults(repositories);
//     } else {
//       const filteredRepo = repositories.filter((repo) =>
//         repo.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       setSearchResults(filteredRepo);
//     }
//   }, [searchQuery, repositories]);

//   return (
//     <>
//       <Navbar />

//       <section id="dashboard">
//         <aside>
//           <h3>Suggested Repositories</h3>

//           {suggestedRepositories.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//         </aside>

//         <main>
//           <h3>Your Repositories</h3>

//           <div id="search">
//             <input
//               type="text"
//               value={searchQuery}
//               placeholder="Search..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {searchResults.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//         </main>

//         <aside>
//           <h3>Upcoming Events</h3>

//           <ul>
//             <li>
//               <p>Tech Conference - Dec - 12</p>
//             </li>

//             <li>
//               <p>Developer Meetup - Dec - 15</p>
//             </li>

//             <li>
//               <p>React Summit - Jan - 05</p>
//             </li>
//           </ul>
//         </aside>
//       </section>
//     </>
//   );
// };

// export default Dashboard;












import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState([]);
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

    return repositories.filter((repo) =>
      repo.name?.toLowerCase().includes(query),
    );
  }, [searchQuery, repositories]);

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
                <button type="button">
                   <span>▢</span>
                  Ask
                </button>

                <button type="button">
                  <span>▣</span>
                  All repositories
                </button>

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

            <button type="button">
              <span>◌</span>
              Create issue
            </button>

            <button type="button">
              <span>▤</span>
              Write code
            </button>

            <button type="button">
              <span>⑂</span>
              Git
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
                Trending repositories·<button type="button">See more</button>
              </p>
            </div>

            {loading ? (
              <p className="feed-loading">Loading feed...</p>
            ) : trendingRepositories.length > 0 ? (
              trendingRepositories.slice(0, 3).map((repo, index) => (
                <article className="trending-repository" key={repo._id}>
                  <div className="trending-repository-content">
                    <div className="repository-owner">
                      <span className="feed-avatar">
                        {repo.name?.charAt(0).toUpperCase() || "R"}
                      </span>

                      <h3>
                        Developer/{repo.name || `repository-${index + 1}`}
                      </h3>
                    </div>

                    <p className="trending-description">
                      {repo.description ||
                        "A public repository shared by the developer community."}
                    </p>

                    <div className="trending-details">
                      <span>
                        <span className="language-circle"></span>
                        JavaScript
                      </span>

                      <span>☆ {repo.stars || 0}</span>
                    </div>
                  </div>

                  <button type="button" className="star-button">
                    ☆ Star
                    <span>⌄</span>
                  </button>
                </article>
              ))
            ) : (
              <div className="empty-feed">
                <h3>No trending repositories available</h3>
                <p>Public repositories will appear here when available.</p>
              </div>
            )}
          </section>

          <section className="your-repositories-section">
            {searchResults.length > 0
              ? searchResults.map((repo) => (
                  <article className="user-repository-card" key={repo._id}>
                    <div>
                      <div className="user-repository-title">
                        <h3>{repo.name}</h3>

                        <span>
                          {repo.visibility === false ? "Private" : "Public"}
                        </span>
                      </div>

                      <p>{repo.description || "No description available"}</p>

                      <div className="user-repository-details">
                        <span>
                          <span className="language-circle"></span>
                          JavaScript
                        </span>

                        <span>☆ 0</span>
                        <span>Updated recently</span>
                      </div>
                    </div>

                    <button type="button" className="star-button">
                      ☆ Star
                    </button>
                  </article>
                ))
              : !loading   
                }
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

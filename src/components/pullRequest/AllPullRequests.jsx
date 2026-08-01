import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./pullRequest.css";

const AllPullRequests = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPullRequests();
  }, []);

  async function fetchPullRequests() {
    try {
      const response = await fetch(
        "https://github-backend-3.onrender.com/pull-request/all"
      );

      const data = await response.json();
      setPullRequests(data);
    } catch (err) {
      console.log("Error fetching pull requests:", err);
      setPullRequests([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="pr-page">
        <h2>All Pull Requests</h2>

        {loading ? (
          <h3>Loading...</h3>
        ) : pullRequests.length === 0 ? (
          <h3>No Pull Requests Found</h3>
        ) : (
          pullRequests.map((pr) => (
            <div className="pr-card" key={pr._id}>
              <div>
                <h3>{pr.title}</h3>
                <p>{pr.description}</p>

                <small>
                  Repository: {pr.repository?.name || "Unknown"}
                </small>

                <br />

                <small>
                  {pr.sourceBranch} → {pr.targetBranch}
                </small>
              </div>

              <span className="pr-status">{pr.status}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllPullRequests;
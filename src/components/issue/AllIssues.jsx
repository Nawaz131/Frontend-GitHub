import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./issue.css";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllIssues();
  }, []);

  async function fetchAllIssues() {
    try {
      const response = await fetch(
        "https://github-backend-3.onrender.com/issue/all"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await response.json();
      setIssues(data);

    } catch (err) {
      console.log("Error while fetching all issues:", err);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="issues-page">
        <div className="issues-header">
          <h2>All Issues</h2>
        </div>

        {loading ? (
          <h3>Loading Issues...</h3>
        ) : issues.length === 0 ? (
          <h3>No Issues Found</h3>
        ) : (
          issues.map((issue) => (
            <div className="issue-card" key={issue._id}>
              <div>
                <h3>{issue.title}</h3>

                <p>{issue.description}</p>

                <small>
                  Repository: {issue.repository?.name || "Unknown"}
                </small>

                <br />

                <small>Status: {issue.status}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllIssues;
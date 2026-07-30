import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./issue.css";

const Issues = () => {
  const { repoId } = useParams();

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, [repoId]);

  async function fetchIssues() {
    try {
      const response = await fetch(
        `https://github-backend-3.onrender.com/issue/all/${repoId}`
      );

      const data = await response.json();

      setIssues(data);
    } catch (err) {
      console.log("Error while fetching issues", err);
    }
  }

  return (
    <div className="issues-page">
      <div className="issues-header">
        <h2>Issues</h2>

        <Link
          to={`/repository/${repoId}/issues/create`}
          className="new-issue-btn"
        >
          New Issue
        </Link>
      </div>

      {issues.length === 0 ? (
        <h3>No Issues Found</h3>
      ) : (
        issues.map((issue) => (
          <div className="issue-card" key={issue._id}>
            <div>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <small>Status: {issue.status}</small>
            </div>

            <Link to={`/repository/${repoId}/issues/${issue._id}`}>
              View
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Issues;
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./issue.css";

const CreateIssue = () => {
  const { repoId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://github-backend-3.onrender.com/issue/create/${repoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create issue");
      }

      navigate(`/repository/${repoId}/issues`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
<div className="create-issue-page">
  <div className="issue-container">
    <h1>Create new issue</h1>

    <form onSubmit={handleSubmit}>
      <label>Title</label>

      <input
        type="text"
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description</label>

      <textarea
        placeholder="Describe the issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="8"
      />

      <div className="buttons">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="create-btn"
        >
          Create Issue
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default CreateIssue;
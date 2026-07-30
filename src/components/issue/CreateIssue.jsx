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
    <div className="create-issue">
      <h2>Create New Issue</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Issue Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
};

export default CreateIssue;
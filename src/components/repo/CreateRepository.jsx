// const CreateRepository = () => {
//   return (
//     <div>
//       <h1>Create Repository</h1>
//     </div>
//   );
// };

// export default CreateRepository;




import React, { useState } from "react";
import "./CreateRepository.css";

const CreateRepository = () => {
  const [repo, setRepo] = useState({
    name: "",
    description: "",
    visibility: "public",
  });

  const handleChange = (e) => {
    setRepo({
      ...repo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "https://github-backend-3.onrender.com/repo/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: repo.name,
            description: repo.description,
            visibility: repo.visibility === "public",
            owner: userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Repository creation failed"
        );
      }

      alert("Repository created successfully");

      setRepo({
        name: "",
        description: "",
        visibility: "public",
      });
    } catch (error) {
      console.error("Repository creation error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="create-repo-container">
      <div className="create-repo-card">
        <h1>Create a new repository</h1>

        <p>
          A repository contains your project's code, files, and version history.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Repository Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter repository name"
            value={repo.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description (Optional)</label>

          <textarea
            id="description"
            name="description"
            placeholder="Describe your repository"
            value={repo.description}
            onChange={handleChange}
          />

          <label>Visibility</label>

          <div className="visibility">
            <label>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={repo.visibility === "public"}
                onChange={handleChange}
              />
              Public
            </label>

            <label>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={repo.visibility === "private"}
                onChange={handleChange}
              />
              Private
            </label>
          </div>

          <button type="submit">Create Repository</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRepository;
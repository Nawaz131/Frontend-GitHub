import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // Data fetching
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();

        // console.log(data);

        setRepositories(data.repositories || []);
      } catch (err) {
        console.log("Error while fetching repositories", err);
        setRepositories([]);
      }
    };

    // Searching repositories of all data
    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/all`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggested repositories");
        }

        const data = await response.json();

        // console.log(data);

        setSuggestedRepositories(data.repositories || data || []);
      } catch (err) {
        console.log("Error while fetching repositories", err);
        setSuggestedRepositories([]);
      }
    };

    if (userId) {
      fetchRepositories();
    }

    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>

          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>

        <main>
          <h3>Your Repositories</h3>

          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </main>

        <aside>
          <h3>Upcoming Events</h3>

          <ul>
            <li>
              <p>Tech Conference - Dec - 12</p>
            </li>

            <li>
              <p>Developer Meetup - Dec - 15</p>
            </li>

            <li>
              <p>React Summit - Jan - 05</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
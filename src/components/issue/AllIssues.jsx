// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar";
// import "./issue.css";

// const AllIssues = () => {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllIssues();
//   }, []);

//   async function fetchAllIssues() {
//     try {
//       const response = await fetch(
//         "https://github-backend-3.onrender.com/issue/all"
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch issues");
//       }

//       const data = await response.json();
//       setIssues(data);

//     } catch (err) {
//       console.log("Error while fetching all issues:", err);
//       setIssues([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="issues-page">
//         <div className="issues-header">
//           <h2>All Issues</h2>
//         </div>

//         {loading ? (
//           <h3>Loading Issues...</h3>
//         ) : issues.length === 0 ? (
//           <h3>No Issues Found</h3>
//         ) : (
//           issues.map((issue) => (
//             <div className="issue-card" key={issue._id}>
//               <div>
//                 <h3>{issue.title}</h3>

//                 <p>{issue.description}</p>

//                 <small>
//                   Repository: {issue.repository?.name || "Unknown"}
//                 </small>

//                 <br />

//                 <small>Status: {issue.status}</small>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default AllIssues;










import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

        {/* Header */}

        <div className="issues-header">

          <h2>All Issues</h2>

          <button className="new-issue-btn">
            New Issue
          </button>

        </div>

        {/* Loading */}

        {loading ? (
          <h3 className="loading-text">Loading Issues...</h3>
        ) : issues.length === 0 ? (
          <h3 className="loading-text">No Issues Found</h3>
        ) : (

          issues.map((issue) => (

            <div className="issue-card" key={issue._id}>

              <div className="issue-top">

                <div>

                  <h3>{issue.title}</h3>

                  <p className="issue-description">
                    {issue.description}
                  </p>

                </div>

                <span className="status-badge">
                  {issue.status}
                </span>

              </div>

              <div className="issue-bottom">

                <div className="repo-name">
                  📦 Repository :
                  <strong> {issue.repository?.name || "Unknown"}</strong>
                </div>

                <div className="issue-buttons">

                  <Link
                    to={`/repository/${issue.repository?._id}/issues/${issue._id}`}
                  >
                    <button className="view-btn">
                      View
                    </button>
                  </Link>

                  <button className="edit-btn">
                    Edit
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>
    </>
  );
};

export default AllIssues;
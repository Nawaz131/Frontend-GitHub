import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";

//pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepository from "./components/repo/CreateRepository";
import AllIssues from "./components/issue/AllIssues";
import AllPullRequests from "./components/pullRequest/AllPullRequests";

//Issue Pages
import Issues from "./components/issue/Issues";
import CreateIssue from "./components/issue/CreateIssue";

//Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }

    if (userIdFromStorage && window.location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/create",
      element: <CreateRepository />,
    },

    // Issue Routes
    {
      path: "/repository/:repoId/issues",
      element: <Issues />,
    },
    {
      path: "/repository/:repoId/issues/create",
      element: <CreateIssue />,
    },
    {
      path: "/issues",
      element: <AllIssues />,
    },
    {
      path: "/pull-requests",
      element: <AllPullRequests />,
    },
  ]);

  return element;
};

export default ProjectRoutes;

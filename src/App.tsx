import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import AdminTable from "./pages/AdminTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/" element={<AdminTable />} />
      </Routes>
    </Router>
  );
}

export default App;

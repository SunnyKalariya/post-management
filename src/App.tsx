import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import AdminTable from "./pages/AdminTable";
import LoginScreen from "./pages/LoginScreen";
import Header from "./components/Header";
import ProfileScreen from "./pages/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/post" element={<PostPage />} />
        <Route path="/admin" element={<AdminTable />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

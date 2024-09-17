import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, DetailPage, EditPost, EditUserInfo, FishBone, Login, PostsApprove, Signup } from "./pages/index";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/posts/:id" element={<DetailPage />} />
        <Route path="/fishbone/:id" element={<FishBone />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/edituserinfo" element={<EditUserInfo />} />
        <Route path="/approve-posts" element={<PostsApprove />} />
      </Routes>
    </>
  );
}

export default App;

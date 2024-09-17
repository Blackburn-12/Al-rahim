import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  CreatPost,
  Dashboard,
  EditPost,
  EditUserInfo,
  Home,
  Login,
  Myposts,
  PostDetail,
  Signup,
} from "./pages/index";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/edituserinfo" element={<EditUserInfo />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createmodule" element={<CreatPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/myposts" element={<Myposts />} /> 
      </Routes>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import style from "./App.module.css"

import Home from "./pages/Home";
import Post from "./pages/Post"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Platforms from "./pages/Platforms";
import PageNotFound from "./pages/PageNotFound";
import AuthProvider from "./components/AuthProvider";
import CreatePost from "./components/posts/CreatePost";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"

import { FaCircleHalfStroke } from "react-icons/fa6"

function App() {
  if (!localStorage.getItem('dark'))
    localStorage.setItem('dark', JSON.stringify(false))

  const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')))

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark))
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [dark])

  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className={style.main_container}>
          <Routes>
            <Route path="/" element={<Home dark={dark} />} />
            <Route path="/post/:postSlug" element={<Post />} />
            <Route path="/platforms/" element={<Platforms dark={dark} />} />
            <Route path="/platforms/:platformName" element={<Platforms dark={dark} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile dark={dark} />} />
            <Route path="/profile/:profileSlug" element={<Profile dark={dark} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
        <button onClick={() => setDark(!dark)} className={`${style.dark_btn} ${dark && style.dark}`}>
          <FaCircleHalfStroke />
        </button>
        <CreatePost dark={dark}/>
      </Router>
    </AuthProvider>
  );
}

export default App;

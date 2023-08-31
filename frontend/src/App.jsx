import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import style from "./App.module.css"

import AuthProvider from "./components/AuthProvider";
import Home from "./components/pages/Home";
import Post from "./components/pages/Post"
import Login from "./components/pages/Login"
import Profile from "./components/pages/Profile"
import Platform from "./components/pages/Platform";
import PageNotFound from "./components/pages/PageNotFound";
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
            <Route path="/platform/:platformName" element={<Platform dark={dark} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
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

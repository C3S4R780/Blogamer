import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from "./App.module.css"

import Home from "./components/pages/Home";
import Post from "./components/pages/Post"
import Login from "./components/pages/Login"

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"
import Platform from "./components/pages/Platform";

import { FaCircleHalfStroke } from "react-icons/fa6"

function App() {
  if (!localStorage.getItem('dark'))
    localStorage.setItem('dark', JSON.stringify(false))

  const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')))
  const toggleDark = () => {
    setDark(!dark)
    // window.location.reload()
  }

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark))
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [dark])

  return (
    <Router>
      <Header />
      <main className={style.main_container}>
        <button
          onClick={toggleDark}
          className={`${style.dark_btn} ${dark && style.dark}`}
        >
          <FaCircleHalfStroke />
        </button>
        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/platform/:platformName" element={<Platform dark={dark} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

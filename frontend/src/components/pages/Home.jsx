import {useState, useEffect} from 'react'
import style from './Home.module.css'

import { API } from '../../constant';
import FilterSidebar from '../filter/FilterSidebar';
import Posts from '../posts/Posts';

function Home({ dark }) {
  document.title = "Home - Blogamer"
  const [posts, setPosts] = useState()

  useEffect(() => {
    fetch(`${API}/posts?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(resp => resp.json())
    .then(data => setPosts(data.data))
    .catch(err => console.error(err.message))
  }, [])
  return (
    <div className={style.home}>
      <div className={style.home_sidebar}>
        <FilterSidebar dark={dark} />
      </div>
      <div className={style.home_content}>
        <h2>Ultimos posts</h2>
        <Posts dark={dark} posts={posts}/>
      </div>
    </div>
  )
}

export default Home
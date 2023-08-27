import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../../constant'
import style from './Platform.module.css'
import PostCard from '../posts/PostCard'

function Platform({ dark }) {
  const [posts, setPlatform] = useState([])
  const { platformName } = useParams()

  useEffect(() => {
    fetch(`${API}/posts?filters[$and][0][platforms][slug][$contains]=${platformName}&populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => setPlatform(data.data))
    .catch(err => console.error(err.message))
  }, [platformName])

  return (
    <div className={style.platform}>
      <div className={style.platform_content}>
        <h2>{platformName}</h2>
        <div className={style.platform_posts}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} dark={dark}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Platform
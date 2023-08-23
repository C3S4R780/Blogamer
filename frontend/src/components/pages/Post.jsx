import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import style from './Post.module.css'

import ShareSidebar from '../filter/ShareSidebar'

import { FaArrowLeft } from 'react-icons/fa6'

function Post() {
  const [post, setPost] = useState([])
  const { postId } = useParams()

  useEffect(() => {
    fetch(`http://localhost:1337/api/posts/${postId}?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => setPost(data.data.attributes))
    .catch(err => console.error(err.message))
  }, [postId])

  useEffect(() => {
    document.title = post.title ? post.title + " - Blogamer" : "Carregando..."
  }, [post.title])

  const thumbnail =
    post.thumbnail?.data ?
    `http://localhost:1337${post.thumbnail.data.attributes.url}` :
    "/no-image.png"

  return (
    <div className={style.post_container}>
      <div className={style.post}>
        <div className={style.post_back} onClick={() => window.history.back()}>
          <FaArrowLeft />
          <span>Voltar</span>
        </div>
        <div className={style.post_title}>
          <h1>{post.title}</h1>
        </div>
        {post.excerpt && (
          <div className={style.post_excerpt}>
            <q>{post.excerpt}</q>
          </div>
        )}
        <div className={style.post_thumbnail}>
          <img src={thumbnail} alt={post.thumbnail?.data?.attributes.alternativeText} />
        </div>
        <div className={style.post_info}>
          <div className={style.post_platforms}>
            <h3>Plataformas:</h3>
            {post.platforms && post.platforms?.data.map(platform => (
              <Link key={`platform-${platform.id}`} to={`/platform/${platform.attributes.name.toLowerCase()}`}>
                {platform.attributes.name}
              </Link>
            ))}
          </div>
          <div className={style.post_author}>
            <h3>Por C3S4R780</h3>
          </div>
        </div>
        <div className={style.post_content}>
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
      <div>
        <ShareSidebar />
      </div>
    </div>
  )
}

export default Post
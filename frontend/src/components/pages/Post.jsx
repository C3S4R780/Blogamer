import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Markup } from 'react-render-markup';

import { API } from '../../constant'
import style from './Post.module.css'

import ShareSidebar from '../filter/ShareSidebar'

import { FaArrowLeft } from 'react-icons/fa6'

function Post() {
  const navigate = useNavigate()
  const [post, setPost] = useState([])
  const { postSlug } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API}/posts/${postSlug}?populate=*`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()

        if (data.error) {
          navigate("/404", { replace: true })

        } else {
          setPost(data.data.attributes)
          document.title =`Blogamer - ${post.title}`

        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchPost()
  }, [postSlug, post.title])

  const thumbnail =
    post.thumbnail?.data ?
    `http://localhost:1338${post.thumbnail.data.attributes.url}` :
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
            <p>{post.excerpt}</p>
          </div>
        )}
        <div className={style.post_thumbnail}>
          <img src={thumbnail} alt={post.thumbnail?.data?.attributes.alternativeText} />
        </div>
        <div className={style.post_info}>
          <div className={style.post_platforms}>
            <h3>Plataformas:</h3>
            {post.platforms && post.platforms?.data.map(platform => (
              <Link key={`platform-${platform.id}`} to={`/platform/${platform.attributes.name}`}>
                {platform.attributes.name}
              </Link>
            ))}
          </div>
          <div className={style.post_author}>
            <h3>
              Por
              <Link to={`/author/${post.author?.data?.attributes.slug}`}>
                {post.author?.data?.attributes.username}
              </Link>
            </h3>
          </div>
        </div>
        <div className={style.post_content}>
          <Markup markup={post.content} />
        </div>
      </div>
      <div>
        <ShareSidebar />
      </div>
    </div>
  )
}

export default Post
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from "./PostCard.module.css"

import { FaArrowRight, FaHeart } from "react-icons/fa6"
import { BiSolidCommentDetail } from "react-icons/bi"

function PostCard({ post, dark }) {
  const [thumbnail, setThumbnail] = useState(null)
  const postUrl = `/post/${post.attributes.slug}`

  const getPostDate = (postDate) => {
    const parsedDate = new Date(postDate)
    return parsedDate.toLocaleString().split(' ')[0]
  }

  useEffect(() => {
    if (post.attributes.thumbnail?.data) {
      const thumbData = post.attributes.thumbnail.data.attributes
      const thumbUrl = thumbData.formats.medium?.url ?? thumbData.url

      fetch(`http://localhost:1338${thumbUrl}`)
      .then(resp => {
        if (resp.ok) {
          setThumbnail(resp.url)
        } else {
          setThumbnail("/no-image.png")
        }
      })
    } else {
      setThumbnail('/no-image.png')
    }
  }, [thumbnail, post.attributes.thumbnail?.data])

  return (
    <div className={`${style.post_card} ${dark ? style.dark : ''}`}>
      <div className={style.post_card_thumb}>
        <Link to={postUrl} className={style.post_card_img}>
            <img src={thumbnail} alt={post.attributes.thumbnail.data?.attributes.alternativeText} />
        </Link>
        <div className={style.post_card_meta}>
          <div className={style.post_card_meta_section}>
            <span>
              <Link to={`/profile/${post.attributes.author.data.attributes.slug}`}>
                {post.attributes.author.data.attributes.username}
              </Link>
            </span>
            <span>{getPostDate(post.attributes.createdAt)}</span>
          </div>
          <div className={style.post_card_meta_section}>
            <span>{post.attributes.post_likes.data.length}<FaHeart /></span>
            <span>{post.attributes.comments.data.length}<BiSolidCommentDetail /></span>
          </div>
        </div>
      </div>
      <div className={style.post_card_content}>
        <div className={style.post_card_platforms}>
          {post.attributes?.platforms && post.attributes.platforms.data.map(platform => (
            <Link key={platform.id} to={`/platforms/${platform.attributes.name}`}>
              {platform.attributes.name}
            </Link>
          ))}
        </div>
        <span>
          <Link to={postUrl}>{
            post.attributes.title.length > 60 ?
              post.attributes.title.substring(0, 60) + "..."
            :
              post.attributes.title
          }</Link>
        </span>
        {post.attributes?.excerpt && (
          <p>{post.attributes.excerpt}</p>
        )}
        <Link to={postUrl} className={style.post_link}>
          Ver mais
          <FaArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default PostCard
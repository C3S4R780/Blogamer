import { Link } from 'react-router-dom'
import style from "./PostCard.module.css"

import { FaArrowRight } from "react-icons/fa6"

function PostCard({ post, dark }) {
  const postUrl = `/post/${post.attributes.slug}`
  const thumbnail =
    post.attributes.thumbnail.data ?
    `http://localhost:1338${post.attributes.thumbnail.data.attributes.formats.small.url}` :
    "/no-image.png"

  return (
    <div className={`${style.post_card} ${dark && style.dark}`}>
      <Link to={postUrl} className={style.post_card_img}>
        <img src={thumbnail} alt={post.attributes.thumbnail.data?.attributes.alternativeText} />
      </Link>
      <div className={style.post_card_content}>
        <div className={style.post_card_platforms}>
          {post.attributes?.platforms && post.attributes.platforms.data.map(platform => (
            <Link key={platform.id} to={`/platform/${platform.attributes.name}`}>
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
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Markup } from 'react-render-markup';

import { API } from '../constant'
import style from './Post.module.css'

import ShareSidebar from '../components/filter/ShareSidebar'

import { FaArrowLeft } from 'react-icons/fa6'

function Post() {
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const [thumbnail, setThumbnail] = useState(null)
    const { postSlug } = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API}/posts/${postSlug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await response.json()

                if (data.error) {
                    data.error.status === 404 && navigate("/404", { replace: true })
                    console.error(data.error.message)

                } else {
                    setPost(data.data.attributes)
                    document.title =`Blogamer - ${post.title}`
                }

            } catch (err) {
                console.error(err)
            }
        }

        fetchPost()
    }, [navigate, postSlug, post.title])

    if (post.thumbnail?.data) {
        fetch(`http://localhost:1338${post.thumbnail.data.attributes.url}`)
        .then(resp => {
            if (resp.ok) {
                setThumbnail(resp.url)
            } else {
                setThumbnail("/no-image.png")
            }
        })
    }

    return (
        <>
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
                    {thumbnail && (
                        <div className={style.post_thumbnail}>
                            <img src={thumbnail} alt={post.thumbnail?.data?.attributes.alternativeText} />
                        </div>
                    )}
                    <div className={style.post_info}>
                        <div className={style.post_platforms}>
                            <h3>Plataformas:</h3>
                            {post.platforms && post.platforms?.data.map(platform => (
                                <Link key={`platforms-${platform.id}`} to={`/platforms/${platform.attributes.name}`}>
                                    {platform.attributes.name}
                                </Link>
                            ))}
                        </div>
                        <div className={style.post_author}>
                            <h3>
                                Por
                                <Link to={`/profile/${post.author?.data?.attributes.slug}`}>
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
        </>
    )
}

export default Post
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { Markup } from 'react-render-markup';

import { API, BEARER } from '../constant'
import { getToken } from '../helper';
import style from './Post.module.css'

import ShareSidebar from '../components/filter/ShareSidebar'
import Comments from '../components/layout/Comments'

import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa6"
import { BiSolidCommentDetail } from "react-icons/bi"

function Post() {
    const navigate = useNavigate()
    const userToken = getToken()
    const { user } = useAuthContext()
    const { postSlug } = useParams()
    const [postId, setPostId] = useState()
    const [post, setPost] = useState([])
    const [thumbnail, setThumbnail] = useState(null)
    const [liked, setLiked] = useState(false)

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
                    setPostId(data.data.id)
                    document.title =`Blogamer - ${post.title}`
                }

            } catch (err) {
                console.error(err)
            }
        }

        fetchPost()
    }, [navigate, postSlug, post.title, liked])

    useEffect(() => {
        user && setLiked(
            user.user_likes?.filter(
                likedPost => likedPost.slug === postSlug
            ).length > 0
        )
    }, [user, postSlug])

    const scrollToComments = () => {
        document.querySelector('#comments').scrollIntoView()
        document.querySelector('#comments textarea')?.focus()
    }

    const toggleLike = (e) => {
        e.preventDefault()

        if (!user) return navigate(`/login?redirect=/post/${postSlug}`)

        fetch(`${API}/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${BEARER} ${userToken}`
            },
            body: JSON.stringify({
                'user_likes': !liked ? [
                    ...user.user_likes.map(like => { return like.id }),
                    postId
                ] : [
                    ...user.user_likes.filter(like => like.id !== postId)
                ]
            })
        })
        .then(resp => {
            if (resp.ok) window.location.reload()
            else {
                alert(resp)
                console.error(resp)
            }
        })
        .catch(err => console.error(err))
    }

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
                        <div>
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
                        <div className={`${style.post_meta} ${liked && style.post_liked}`}>
                            <button onClick={toggleLike}>
                                {post.post_likes?.data.length}
                                {liked ? <FaHeart /> : <FaRegHeart />}
                            </button>
                            <button onClick={scrollToComments}>
                                {post.comments?.data.length}
                                <BiSolidCommentDetail />
                            </button>
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
            <Comments post={post.slug}/>
        </>
    )
}

export default Post
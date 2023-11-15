import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { getToken } from "../helper"
import { API } from "../constant"

import style from "./Profile.module.css"
import Posts from "../components/posts/Posts"
import FormButton from "../components/inputs/FormButton"
import Follows from "../components/users/Follows"

function Profile({ dark }) {
    const navigate = useNavigate()
    const userToken = getToken()
    const pageSize = 3

    const { user } = useAuthContext()
    const { profileSlug } = useParams()
    const [profile, setProfile] = useState(false)
    const [following, setFollowing] = useState(false)

    const [posts, setPosts] = useState([])
    const [postPagination, setPostPagination] = useState([])
    const [postPage, setPostPage] = useState(1)

    const [likedPosts, setLikedPosts] = useState([])
    const [likedPagination, setLikedPagination] = useState([])
    const [likedPage, setLikedPage] = useState(1)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (profileSlug === user?.slug) {
            navigate('/profile', { replace: true })
        }

        if (profileSlug) {
            fetch(`${API}/users/${profileSlug}`)
            .then(async resp => {
                const data = await resp.json()

                if (data.notFound) {
                    navigate("/404", { replace: true })
                }

                setFollowing(data.followers.filter(follower => follower.id === user?.id).length)

                setProfile(data)
            })
            .catch(err => console.error(err))

        } else {
            if (!userToken) {
                navigate("/login", { replace: true })
            }

            setProfile(user)
        }
    }, [navigate, profileSlug, user, userToken, following])

    useEffect(() => {
        setPostPage(1)
        setLikedPage(1)
    }, [profile])

    useEffect(() => {
        if (profile?.id) {
            fetch(`${API}/posts?&populate=*&sort=id:DESC&pagination[page]=${postPage}&pagination[pageSize]=${pageSize}&filters[$and][0][author][id][$eq]=${profile?.id}`)
            .then(resp => resp.json())
            .then(data => {
                if (postPage !== 1) {
                    setPosts(postList => [...postList, ...data.data])
                } else {
                    setPosts(data.data)
                }
                setPostPagination(data.meta.pagination)
            })
            .catch(err => console.error(err))
            .finally(setIsLoading(false))

            fetch(`${API}/posts?&populate=*&sort=id:DESC&pagination[page]=${likedPage}&pagination[pageSize]=${pageSize}&filters[$and][0][post_likes][id][$eq]=${profile?.id}`)
            .then(resp => resp.json())
            .then(data => {
                if (likedPage !== 1) {
                    setLikedPosts(likedPostList => [...likedPostList, ...data.data])
                } else {
                    setLikedPosts(data.data)
                }
                setLikedPagination(data.meta.pagination)
            })
            .catch(err => console.error(err))
            .finally(setIsLoading(false))

        }
    }, [postPage, likedPage, profile])

    const getUserDate = (userDate) => {
        const parsedDate = new Date(userDate)
        return parsedDate.toLocaleString()
    }

    return (
        <div className={style.profile}>
            <div className={style.profile_header}>
                <div className={style.profile_header_info}>
                    <h1>
                        {profile?.username}
                    </h1>
                    <div>
                        <span><b>Email: </b></span>
                        <Link to={`mailto:${profile?.email}`}>
                            {profile?.email}
                        </Link>
                    </div>
                    <div>
                        <span><b>Entrou em: </b></span>
                        <span>{getUserDate(profile?.createdAt)}</span>
                    </div>
                </div>
                <div className={style.profile_follow}>
                    <Follows
                        profileSlug={profileSlug}
                        following={following}
                        setFollowing={setFollowing}
                    />
                    <div className={style.profile_follow_count}>
                        <span>
                            <b>{profile?.following?.length}</b> seguindo
                        </span>
                        <span>
                            <b>{profile?.followers?.length}</b> seguidores
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.profile_posts}>
                <div className={style.profile_posts_recent}>
                    <h2>Posts recentes:</h2>
                    <Posts dark={dark} posts={posts} layout={style.profile_post_card}/>
                    {postPagination.page < postPagination.pageCount && (
                        <FormButton
                            text='Carregar mais posts'
                            loading={isLoading}
                            onClick={() => setPostPage(postPage+1)}
                        />
                    )}
                </div>
                <div className={style.profile_posts_liked}>
                    <h2>Posts favoritos:</h2>
                    <Posts dark={dark} posts={likedPosts} layout={style.profile_post_card}/>
                    {likedPagination.page < likedPagination.pageCount && (
                        <FormButton
                            text='Carregar mais posts'
                            loading={isLoading}
                            onClick={() => setLikedPage(likedPage+1)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
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
    const { user } = useAuthContext()
    const { profileSlug } = useParams()
    const [profile, setProfile] = useState(false)
    const [following, setFollowing] = useState(false)
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const pageSize = 3

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

    useEffect(() => setPage(1), [profile])

    useEffect(() => {
        if (profile?.id) {
            fetch(`${API}/posts?&populate=*&sort=id:DESC&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][author][id][$eq]=${profile?.id}`)
            .then(resp => resp.json())
            .then(data => {
                if (page !== 1) {
                    setPosts(postList => [...postList, ...data.data])
                } else {
                    setPosts(data.data)
                }
                setPagination(data.meta.pagination)
            })
            .catch(err => console.error(err))
            .finally(setIsLoading(false))

        }
    }, [page, profile])

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
                <h2>Posts recentes:</h2>
                <Posts dark={dark} posts={posts} layout={style.profile_post_card}/>
                {pagination.page < pagination.pageCount && (
                <FormButton
                    text='Carregar mais posts'
                    loading={isLoading}
                    onClick={() => setPage(page+1)}
                />
            )}
            </div>
        </div>
    )
}

export default Profile
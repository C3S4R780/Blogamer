import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { getToken } from "../helper"
import { API } from "../constant"

import style from "./Profile.module.css"
import Posts from "../components/posts/Posts"
import FormButton from "../components/inputs/FormButton"

function Profile({ dark }) {
    const navigate = useNavigate()
    const userToken = getToken()
    const { user } = useAuthContext()
    const { profileSlug } = useParams()
    const [profile, setProfile] = useState(false)
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const pageSize = 2

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

                setProfile(data)
            })
            .catch(err => console.error(err))

        } else {
            if (!userToken) {
                navigate("/login", { replace: true })
            }

            setProfile(user)
        }
    }, [navigate, profileSlug, user, userToken])

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

    return (
        <div className={style.profile}>
            <div className={style.profile_username}>
                <div className={style.profile_controls}>
                    <h2>{profile?.username}</h2>
                    {profileSlug && (
                        <button type="button">+ Seguir</button>
                    )}
                </div>
                <div className={style.profile_posts}>
                    <Posts dark={dark} posts={posts}/>
                    {pagination.page < pagination.pageCount && (
                    <FormButton
                        text='Carregar mais posts'
                        loading={isLoading}
                        onClick={() => setPage(page+1)}
                    />
                )}
                </div>
            </div>
        </div>
    )
}

export default Profile
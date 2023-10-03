import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import style from "./Profile.module.css"
import { getToken } from "../../helper"
import { API } from "../../constant"
import Posts from "../posts/Posts"

function Profile({ dark }) {
    const navigate = useNavigate()
    const userToken = getToken()
    const { user } = useAuthContext()
    const { profileSlug } = useParams()
    const [profile, setProfile] = useState(false)
    const [posts, setPosts] = useState([])

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

        if (profile?.id) {
            fetch(`${API}/posts?&populate=*&sort=id:DESC&filters[$and][0][author][id][$eq]=${profile?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => setPosts(data.data))
            .catch(err => console.error(err))

        }
    }, [navigate, profileSlug, user, userToken, profile?.id])

    return (
        <div className={style.profile}>
            <div className={style.profile_username}>
                <div className={style.profile_controls}>
                    <h2>{profile?.username}</h2>
                    {profileSlug && (
                        <button type="button">+ Seguir</button>
                    )}
                </div>
                <Posts dark={dark} posts={posts}/>
            </div>
        </div>
    )
}

export default Profile
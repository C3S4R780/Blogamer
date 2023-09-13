import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import style from "./Profile.module.css"
import { getToken } from "../../helper"
import { API } from "../../constant"

function Profile() {
    const navigate = useNavigate()
    const userToken = getToken()
    const { user } = useAuthContext()
    const { profileId } = useParams()
    const [profile, setProfile] = useState()

    useEffect(() => {
        !userToken && navigate("/login", { replace: true })
    })

    useEffect(() => {
        if (profileId) {
            fetch(`${API}/users/${profileId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => setProfile(data))
            .catch(err => console.error(err))
        } else {
            setProfile(user)
        }
    }, [profileId, user])

    return (
        <div className={style.profile}>
            <div className={style.profile_username}>
                <h2>{profile?.username}</h2>
            </div>
        </div>
    )
}

export default Profile
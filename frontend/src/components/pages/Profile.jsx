import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import style from "./Profile.module.css"

function Profile() {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        !user?.id && navigate("/login", { replace: true })
    })

    return (
        <div className={style.profile}>
            <div className={style.profile_username}>
                <h2>{user?.username}</h2>
            </div>
        </div>
    )
}

export default Profile
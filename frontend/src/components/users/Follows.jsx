import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BEARER, API } from "../../constant"
import { useAuthContext } from "../../context/AuthContext"
import { getToken } from "../../helper"

import FormButton from "../inputs/FormButton"

import { FaUserPlus } from "react-icons/fa6"
import { FaUserTimes } from "react-icons/fa"

function Follows({profileSlug, following, setFollowing}) {
    const { user } = useAuthContext()
    const userToken = getToken()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleFollow = async () => {
        if (!user) navigate(`/login?redirect=/profile/${profileSlug}`)

        setIsLoading(true)

        const resp = await fetch(`${API}/users/${profileSlug}`)
        const data = await resp.json()
        const profileId = data.id
        const currentFollowers = data.followers.map(follower => { return follower.id })

        if (!following) {
            fetch(`${API}/users/${profileId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${BEARER} ${userToken}`
                },
                body: JSON.stringify({
                    "followers": [...currentFollowers, user?.id]
                })
            })
            .catch(err => console.error(err))
            .finally(setFollowing(true))

        } else {
            fetch(`${API}/users/${profileId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${BEARER} ${userToken}`
                },
                body: JSON.stringify({
                    "followers": currentFollowers.filter(follower => follower !== user?.id)
                })
            })
            .catch(err => console.error(err))
            .finally(setFollowing(false))
        }

        setIsLoading(false)
    }

    return (
        <>
            {profileSlug && (
                <FormButton
                    onClick={handleFollow}
                    loading={isLoading}
                    text={following ? (<>
                        <span><FaUserTimes /></span>
                        <span>Deixar de seguir</span>
                    </>) : (<>
                        <span><FaUserPlus /></span>
                        <span>Seguir</span>
                    </>)}
                />
            )}
        </>
    )
}

export default Follows
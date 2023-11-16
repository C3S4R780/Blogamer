import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { API, BEARER } from '../../constant'
import { getToken } from '../../helper'

import style from './CreateComment.module.css'
import FormInput from '../inputs/FormInput'
import FormButton from '../inputs/FormButton'

function CreateComment({ post }) {
    const { user } = useAuthContext()
    const authToken = getToken()
    const [isLoading, setIsLoading] = useState(false)

    const getPostId = async () => {
        const resp = await fetch(`${API}/posts/${post}`)
        const data = await resp.json()
        return data.data.id
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const postId = await getPostId()
        const comment = e.target[0].value
        const commentData = {
            "data": {
                "text": comment,
                "user": user.id,
                "post": postId
            }
        }

        try {
            fetch(`${API}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${BEARER} ${authToken}`
                },
                body: JSON.stringify(commentData)
            })
            .then(async resp => {
                if (!resp.ok) {
                    window.location.reload()
                } else {
                    const data = await resp.json()
                    alert(`${data.error.status} - ${data.error.name}`)
                }
            })
            .catch(err => console.error(err))
            .finally(setIsLoading(false))

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={style.new_comment}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <FormInput
                    type='textarea'
                    rows={5}
                    maxlength={500}
                    required
                />
                <FormButton text='Comentar' loading={isLoading} />
            </form>
        </div>
    )
}

export default CreateComment
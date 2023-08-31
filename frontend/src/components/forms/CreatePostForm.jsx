import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import style from "./CreatePostForm.module.css"

import FormInput from "../layout/FormInput"
import PostContentEditor from "../layout/PostContentEditor"
import FormButton from "../layout/FormButton"
import { useAuthContext } from "../../context/AuthContext"

import { API, BEARER } from "../../constant"
import { getToken } from "../../helper"
import FormMultiSelect from "../layout/FormMultiSelect"

function CreatePostForm({ dark, setOpen }) {
  const navigate = useNavigate()
  const authToken = getToken()
  const { user } = useAuthContext()
  const [platforms, setPlatforms] = useState()
  const [selectedPlatforms, setSelectedPlatforms] = useState()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/platforms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => setPlatforms(data.data))
    .catch(err => console.error(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    let postData = {'data':{}}

    formData.forEach((value, key) => {
      if (key === "platforms") {
        postData['data'][key] = JSON.parse(value)
      } else {
        postData['data'][key] = value
      }
    })

    try {
      const response = await fetch(`${API}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${BEARER} ${authToken}`
        },
        body: JSON.stringify(postData)
      })

      const data = await response.json()

      if (data?.error) {
        throw data?.error
      }

    } catch (err) {
      console.error(err.message);

    } finally {
      setIsLoading(false)
      setOpen(false)
      e.target.reset()
      navigate(`/post/${postData['data']['title'].replaceAll(" ", "-").toLowerCase()}`)
    }

  }
  return (
    <>
      <form className={`${style.create_post_form} ${dark && style.dark}`} onSubmit={handleSubmit}>
        <div className={style.create_post_form_title}>
          <h2>Criar post</h2>
        </div>
        {/* TODO: Excerpt and Thumbnail fields */}
        <FormInput
          type="hidden"
          name="author"
          value={user?.id}
          required
        />
        <FormInput
          type="text"
          name="title"
          placeholder="Titulo do post"
          required
        />
        <FormMultiSelect
          placeholder="Plataformas..."
          options={platforms}
          onChange={setSelectedPlatforms}
        />
        <FormInput
          type="hidden"
          name="platforms"
          value={selectedPlatforms}
          required
        />
        <PostContentEditor handleContent={setContent}/>
        <FormInput
          type="hidden"
          name="content"
          value={content}
          required
        />
        <FormButton
          text="Publicar"
          loading={isLoading}
        />
      </form>
      <span className={style.create_post_form_overlay} onClick={() => setOpen(false)}></span>
    </>
  )
}

export default CreatePostForm
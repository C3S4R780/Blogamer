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

import { FaEdit } from "react-icons/fa"

function CreatePostForm({ dark, setOpen }) {
  const navigate = useNavigate()
  const authToken = getToken()
  const { user } = useAuthContext()
  const [platforms, setPlatforms] = useState()
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState()
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
      if (thumbnail) {
        const thumbData = new FormData()
        thumbData.append('files', thumbnail['file'])

        const resp = await fetch(`${API}/upload`, {
          method: "POST",
          headers: {
            "Authorization": `${BEARER} ${authToken}`
          },
          body: thumbData
        })

        const data = await resp.json()
        if (data?.error)
          throw data?.error

        postData['data']['thumbnail'] = data[0].id
      }

    } catch (err) {
      console.error(err)

    } finally {
      let postUrl = ""

      try {
        const resp = await fetch(`${API}/posts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${BEARER} ${authToken}`
          },
          body: JSON.stringify(postData)
        })

        const data = await resp.json()
        postUrl = `/post/${data.data.attributes.slug}`

      } catch (err) {
        console.error(err)

      } finally {
        setIsLoading(false)
        setOpen(false)
        setThumbnail(false)
        setSelectedPlatforms(false)
        setContent("")
        e.target.reset()
        navigate(postUrl)
      }
    }
  }
  const exitPost = (e) => {
      e.preventDefault()
      console.log(e)
      setOpen(false)
      setThumbnail(false)
      setSelectedPlatforms(false)
      setContent("")
      e.target.parentElement.parentElement.reset()
  }
  return (
    <>
      <form autoComplete="off" className={`${style.create_post_form} ${dark && style.dark}`} onSubmit={handleSubmit}>
        <div className={style.create_post_form_title}>
          <h2>Criar post</h2>
        </div>
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
        <FormInput 
          type="text"
          name="excerpt"
          placeholder="Pequena descrição do post..."
        />
        <FormInput
          type="file"
          name="thumbnail"
          text="Clique ou jogue a thumbnail aqui..."
          accept="image/*"
          inlineStyle={{ display: thumbnail && "none"}}
          onChange={setThumbnail}
        />
        {thumbnail && (
          <div className={style.thumbnail_preview}>
            <span>{thumbnail['name']}</span>
            <img src={thumbnail['url']} alt="Post thumbnail" />
            <label htmlFor="thumbnail" >
              <FaEdit /> Alterar imagem
            </label>
          </div>
        )}
        <FormMultiSelect
          placeholder="Plataformas..."
          options={platforms}
          value={selectedPlatforms}
          onChange={setSelectedPlatforms}
        />
        <FormInput
          type="hidden"
          name="platforms"
          value={`[${selectedPlatforms}]`}
          required
        />
        <PostContentEditor value={content} handleContent={setContent}/>
        <FormInput
          type="hidden"
          name="content"
          value={content}
          required
        />
        <div className={style.form_control}>
          <FormButton
            text="Publicar"
            loading={isLoading}
          />
          { <FormButton 
            type="button"
            text="Sair"
            onClick={exitPost}
          /> }
        </div>  
      </form>
      <span className={style.create_post_form_overlay} onClick={() => setOpen(false)}></span>
    </>
  )
}

export default CreatePostForm
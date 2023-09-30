import { useState } from "react"
import style from "./CreatePost.module.css"

import { useAuthContext } from "../../context/AuthContext"
import CreatePostForm from "../forms/CreatePostForm"

import { FaPlus } from "react-icons/fa6"

function CreatePost({ dark }) {
    const { user } = useAuthContext()
    const [open, setOpen] = useState(false)

    if (user && user.role?.id !== 1) {
        return (
            <>
                <button
                    className={`${style.create_post} ${open && style.open}`}
                    onClick={() => setOpen(!open)}>
                    <FaPlus />
                </button>
                <div className={`${style.create_post_modal} ${open && style.open}`}>
                    <CreatePostForm dark={dark} setOpen={setOpen}/>
                </div>
            </>
        )
    }
}

export default CreatePost
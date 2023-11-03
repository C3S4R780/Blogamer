import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../constant'

import style from './Comments.module.css'
import CreateComment from '../forms/CreateComment'

function Comments({ post }) {
    const [comments, setComments] = useState([])

    const getPostDate = (postDate) => {
        const parsedDate = new Date(postDate)
        return parsedDate.toLocaleString()
    }

    useEffect(() => {
        fetch(`${API}/comments?populate[user][fields][0]=username&populate[user][fields][1]=slug&sort=id:desc&filters[$and][0][post][slug][$eq]=${post}`)
        .then(resp => resp.json())
        .then(data => setComments(data.data))
    }, [post])

    return (
        <div className={style.comments}>
            <div className={style.comments_text}>
                <h2>
                    {comments.length ? 'Comentarios' : 'Seja o primeiro a comentar!'}
                </h2>
                <p>Deixe um comentário nos dizendo sua opinião sobre o post</p>
            </div>

            <CreateComment post={post} comments={comments} setComments={setComments}/>

            {comments.length > 0 && (
                <div id='comments' className={style.comments_list}>
                    {comments.map(comment => (
                        <div key={comment.id} className={style.comments_list_item}>
                            <div className={style.comments_list_item_header}>
                                <Link to={`/profile/${comment.attributes.user.data.attributes.slug}`}>
                                    <h2>{comment.attributes.user.data.attributes.username}</h2>
                                </Link>
                                <small>{getPostDate(comment.attributes.createdAt)}</small>
                            </div>
                            <div className={style.comments_list_item_content}>
                                <p>{comment.attributes.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comments
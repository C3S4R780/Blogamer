import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API } from '../constant'

import style from './Platforms.module.css'
import FilterSidebar from '../components/filter/FilterSidebar'
import PostCard from '../components/posts/PostCard'

function Platforms({ dark }) {
    const navigate = useNavigate()
    const { platformName } = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (!platformName) {
            navigate('/platforms/pc', { replace:true })
        }

        fetch(`${API}/posts?filters[$and][0][platforms][slug][$contains]=${platformName}&populate=*`)
        .then(resp => resp.json())
        .then(data => setPosts(data.data))
        .then(() => {
            document.title = platformName ? `Blogamer - ${platformName}` : "Carregando..."
        })
        .catch(err => console.error(err.message))
    }, [platformName, navigate])

    return (
        <div className={style.platform}> 
            <div className={style.platform_sidebar}>
                <FilterSidebar active={platformName} dark={dark}/>
            </div>
            <div className={style.platform_content}>
                <h2>{platformName}</h2>
                {posts.length ? (
                    <div className={style.platform_posts}>
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} dark={dark}/>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum post encontrado.</p>
                )}
            </div>
        </div>
    )
}

export default Platforms
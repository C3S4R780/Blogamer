import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API } from '../constant'

import style from './Platforms.module.css'
import FormButton from '../components/inputs/FormButton'
import FilterSidebar from '../components/filter/FilterSidebar'
import PostCard from '../components/posts/PostCard'

function Platforms({ dark }) {
    const navigate = useNavigate()
    const { platformName } = useParams()
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const pageSize = 4

    useEffect(() => {
        if (!platformName) {
            navigate('/platforms/pc', { replace:true })
        }

        fetch(`${API}/posts?&populate=*&sort=id:DESC&filters[$and][0][platforms][slug][$contains]=${platformName}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
        .then(resp => resp.json())
        .then(data => {
            if (page !== 1) {
                setPosts(postList => [...postList, ...data.data])
            } else {
                setPosts(data.data)
            }
            setPagination(data.meta.pagination)
        })
        .then(() => {
            document.title = platformName ? `Blogamer - ${platformName}` : "Carregando..."
        })
        .catch(err => console.error(err.message))
        .finally(setIsLoading(false))

    }, [platformName, navigate, page])

    useEffect(() => setPage(1), [platformName])

    return (
        <div className={style.platform}> 
            <div className={style.platform_sidebar}>
                <FilterSidebar active={platformName} dark={dark}/>
            </div>
            <div className={style.platform_content}>
                <h1>{platformName}</h1>
                {posts.length ? (
                    <div className={style.platform_posts}>
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} dark={dark}/>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum post encontrado.</p>
                )}
                {pagination.page < pagination.pageCount && (
                    <FormButton
                        text='Carregar mais posts'
                        loading={isLoading}
                        onClick={() => setPage(page+1)}
                    />
                )}
            </div>
        </div>
    )
}

export default Platforms
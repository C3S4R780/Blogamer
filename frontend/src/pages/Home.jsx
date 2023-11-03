import {useState, useEffect} from 'react'
import style from './Home.module.css'

import { API } from '../constant';
import FilterSidebar from '../components/filter/FilterSidebar';
import Posts from '../components/posts/Posts';
import FormButton from '../components/inputs/FormButton'

function Home({ dark }) {
    document.title = "Blogamer"
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const pageSize = 4

    useEffect(() => {
        fetch(`${API}/posts?populate=*&sort=id:DESC&&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
        .then(resp => resp.json())
        .then(data => {
            if (page !== 1) {
                setPosts(postList => [...postList, ...data.data])
            } else {
                setPosts(data.data)
            }
            setPagination(data.meta.pagination)
        })
        .catch(err => console.error(err.message))
        .finally(setIsLoading(false))
    }, [page])

    return (
        <div className={style.home}>
            <div className={style.home_sidebar}>
                <FilterSidebar dark={dark} />
            </div>
            <div className={style.home_content}>
                <h2>Ultimos posts</h2>
                <Posts dark={dark} posts={posts}/>
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

export default Home
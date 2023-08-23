import style from "./Posts.module.css"

import PostCard from '../posts/PostCard';

function Posts({ dark, posts }) {

  return (
    <div className={style.posts}>

      {posts === null && <p>Erro na requisição</p> }
      {posts?.length === 0 && <p>Nenhum post cadastrado</p> }

      {posts && posts.map(post => (
        <PostCard key={post.id} post={post} dark={dark}/>
      ))}
    </div>
  )
}

export default Posts
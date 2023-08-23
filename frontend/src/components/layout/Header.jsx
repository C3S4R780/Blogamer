import { Link } from 'react-router-dom'
import style from './Header.module.css'

function Header() {
  return (
    <header className={style.header}>
      <div className={style.header_content}>
        <Link className={style.header_logo} to="/">
          <img src="/blogamer_logo.png" alt="Logo Blogamer"/>
          <span>BloGamer</span>
        </Link>
        <ul className={style.header_nav}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/plataformas"}>Plataformas</Link>
          </li>
          <li>
            <Link to={"/autores"}>Autores</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
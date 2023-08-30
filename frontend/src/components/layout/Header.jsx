import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helper";
import style from './Header.module.css'

function Header() {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair ?")) {
      removeToken()
      setUser(undefined)
      navigate("/login", { replace: true })
    }
  };

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
            <Link to={"/platforms"}>Plataformas</Link>
          </li>
          <li>
            <Link to={"/authors"}>Autores</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile">{user.username}</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
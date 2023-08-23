import style from './Footer.module.css'
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation()
  const hide = location.pathname === "/login" ? true : false

  return (
    <footer className={`${style.footer} ${hide && style.hide}`}>
      Footer
    </footer>
  )
}

export default Footer
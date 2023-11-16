import style from './Footer.module.css'
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation()
  const hide = location.pathname === "/login" ? true : false
  const dataAtual = new Date();  
  return (
    <footer className={`${style.footer} ${hide && style.hide}`}>
      Copyright&copy; Antonio Marques e Cesar Santos - {dataAtual.getFullYear()}
    </footer>
  )
}

export default Footer
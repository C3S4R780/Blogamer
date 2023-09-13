import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import style from "./PageNotFound.module.css"

import { FaArrowLeft } from 'react-icons/fa6'

function PageNotFound() {
    const navigate = useNavigate()
    const [seconds, setSeconds] = useState(8)
    useEffect(() => {
        seconds >= 0 ?
            setTimeout(() => setSeconds(seconds - 1), 1000)
        :
            navigate('/', { replace:true })
      });
    return (
        <div className={style.page_not_found}>
            <h1>404</h1>
            <h2>
                Opss, parece que esta pagina não existe!
            </h2>
            <span>
                Você será redirecionado para a <Link to={"/"} replace>Home</Link> em {seconds} segundos.
            </span>
            <button onClick={() => window.history.back()}>
                <FaArrowLeft />
                Voltar
            </button>
        </div>
    )
}

export default PageNotFound
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import style from "./Login.module.css"

import LoginForm from "../forms/LoginForm"
import RegistrationForm from "../forms/RegistrationForm"

function Login() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  if (user) {
    navigate("/profile", { replace: true })
  }
  return (
    <div className={style.login}>
      <img src="/login_bg.jpg" className={style.login_bg} alt="Login Background"/>
      <LoginForm />
      <RegistrationForm />
    </div>
  )
}

export default Login
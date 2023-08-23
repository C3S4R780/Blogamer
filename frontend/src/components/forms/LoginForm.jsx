import { Link } from 'react-router-dom'
import style from "./LoginForm.module.css"

import FormInput from '../layout/FormInput'
import FormButton from '../layout/FormButton'

function LoginForm() {
  return (
    <form className={style.login_form}>
      <h2>Login</h2>
      <FormInput
        text="Email"
        type="email"
        name="login_email"
        required
      />
      <FormInput
        text="Senha"
        type="password"
        name="login_password"
        required
      />
      <FormButton text="Login"/>
      <p>
        Esqueceu sua senha? <Link to={"/reset-password"}>Clique aqui</Link>
      </p>
    </form>
  )
}

export default LoginForm
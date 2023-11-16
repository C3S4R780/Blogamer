import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import style from "./LoginForm.module.css"

import { useAuthContext } from "../../context/AuthContext"
import { setToken } from '../../helper'
import { API } from "../../constant"

import FormInput from '../inputs/FormInput'
import FormButton from '../inputs/FormButton'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setUser } = useAuthContext()
  const [queryParameters] = useSearchParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    let loginData = {}

    formData.forEach((value, key) => {
      loginData[key] = value
    })

    try {
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })

      const data = await response.json()

      if (data?.error) {
        throw data?.error

      } else {
        setToken(data.jwt)
        setUser(data.user)

        if (queryParameters.get('redirect')) {
          navigate(`${queryParameters.get('redirect')}`, {replace: true})
        } else {
          navigate("/", { replace: true })
        }
      }

    } catch (err) {
      if (err.details.errors && err.details.errors.length > 1) {
        console.group(err.message)
          err.details.errors.forEach(err =>
            console.error(err.message)
          )
        console.groupEnd()

      }
      setError(err.message)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={style.login_form} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <FormInput
        text="Email"
        type="email"
        name="identifier"
        required
      />
      <FormInput
        text="Senha"
        type="password"
        name="password"
        required
      />
      {error && (
        <div className={style.login_form_error}>
          {error}
        </div>
      )}
      <FormButton text="Login" loading={isLoading}/>
      <p>
        Esqueceu sua senha? <Link to={"/reset-password"}>Clique aqui</Link>
      </p>
    </form>
  )
}

export default LoginForm
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import style from "./RegistrationForm.module.css"

import { useAuthContext } from "../../context/AuthContext"
import { API } from "../../constant"
import { setToken } from "../../helper"

import FormInput from "../inputs/FormInput"
import FormButton from "../inputs/FormButton"

function RegistrationForm() {
  const navigate = useNavigate()
  const { setUser } = useAuthContext();
  const [queryParameters] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true);

    const formData = new FormData(event.currentTarget)
    let registrationData = {}

    formData.forEach((value, key) =>
      registrationData[key] = value
    )

    try {
      const response = await fetch(`${API}/auth/local/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
      })

      const data = await response.json()

      if (data?.error) {
        throw data?.error;

      } else {
        setToken(data.jwt)
        setUser(data.user)

        alert(`Bem-vindo(a) ao Blogamer ${data.user.username}!`)

        if (queryParameters.get('redirect')) {
          navigate(`${queryParameters.get('redirect')}`, {replace: true})
        } else {
          navigate("/", { replace: true })
        }
      }

    } catch (err) {
      console.error(err)
      setError(error?.message ?? "Algo deu errado. Por favor tente novamente mais tarde.")

    } finally {
      setIsLoading(false)
    }

  }
  return (
    <form className={style.registration_form} onSubmit={handleSubmit}>
      <h2>Cadastre-se</h2>
      <FormInput
        text="Usuario"
        type="text"
        name="username"
        required
      />
      <FormInput
        text="Email"
        type="email"
        name="email"
        required
      />
      <FormInput
        text="Senha"
        type="password"
        name="password"
        required
      />
      <FormInput
        text="Confirmar senha"
        type="password"
        name="c_password"
        required
      />
      <FormButton text="Criar conta" loading={isLoading}/>
    </form>
  )
}

export default RegistrationForm
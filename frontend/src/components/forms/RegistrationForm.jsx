import style from "./RegistrationForm.module.css"
import FormInput from "../layout/FormInput"
import FormButton from "../layout/FormButton"

function RegistrationForm() {
  return (
    <form className={style.registration_form}>
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
        name="registration_email"
        required
      />
      <FormInput
        text="Senha"
        type="password"
        name="registration_password"
        required
      />
      <FormInput
        text="Confirmar senha"
        type="password"
        name="registration_password_confirmation"
        required
      />
      <FormButton text="Criar conta"/>
    </form>
  )
}

export default RegistrationForm
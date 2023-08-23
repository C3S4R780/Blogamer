import style from "./FormInput.module.css"

function FormInput({ text, type, name, required=false }) {
  return (
    <span className={style.form_input}>
        <label htmlFor={name}>
            {text}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            required={required}
        />
    </span>
  )
}

export default FormInput
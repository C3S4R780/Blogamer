import style from "./FormInput.module.css"

function FormInput({ text='', type, name, value='', placeholder=undefined, required=false }) {
  return (
    <span className={`${style.form_input} ${type === "hidden" && style.hidden}`}>
        <label htmlFor={name}>
            {text}
        </label>
        <input
            type={type}
            name={name}
            required={required}
            defaultValue={value}
            placeholder={placeholder}
        />
    </span>
  )
}

export default FormInput
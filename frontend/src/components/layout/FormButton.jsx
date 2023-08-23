import style from "./FormButton.module.css"

function FormButton({ text }) {
  return (
    <button className={style.form_button}>
        {text}
    </button>
  )
}

export default FormButton
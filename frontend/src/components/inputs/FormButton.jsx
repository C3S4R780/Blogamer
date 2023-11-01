import style from "./FormButton.module.css"

import { FaSpinner } from "react-icons/fa6"

function FormButton({ text, loading=false, onClick }) {
  return (
    <button className={`${style.form_button} ${loading && style.loading}`} onClick={onClick}>
        {loading ? <FaSpinner /> : text}
    </button>
  )
}

export default FormButton
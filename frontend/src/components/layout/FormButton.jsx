import style from "./FormButton.module.css"

import { FaSpinner } from "react-icons/fa6"

function FormButton({ text, loading=false }) {
  return (
    <button className={`${style.form_button} ${loading && style.loading}`}>
        {loading ? <FaSpinner /> : text}
    </button>
  )
}

export default FormButton
import { useState } from "react"
import style from "./FormInput.module.css"

function FormInput({
    text=undefined,
    type,
    name,
    id=undefined,
    rows=undefined,
    cols=undefined,
    maxlength=undefined,
    value=undefined,
    accept=undefined,
    placeholder=undefined,
    required=false,
    inlineStyle={},
    onChange=undefined
}) {
    const [letterCount, setLetterCount] = useState(maxlength)

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.readAsDataURL(file)
    })

    const handleOnChange = (e) => {
        switch (type) {
            case "file":
                const file = e.target.files[0]

                if(!file) return

                fileToDataUri(file)
                .then(dataUri => {
                    onChange({
                        "file": file,
                        "name": file.name,
                        "url": dataUri
                    })
                })
                break;

            case "textarea":
                if (maxlength) {
                    setLetterCount(maxlength - e.target.value.length)
                }
                break;

            default: break;
        }
    }
  return (
    <span className={`${style.form_input} ${type === "hidden" && style.hidden}`} style={inlineStyle}>
        <label htmlFor={id}>
            {text}
            {type === 'textarea' ? (
                <>
                    <textarea
                        name={name}
                        id={id}
                        required={required}
                        cols={cols}
                        rows={rows}
                        maxLength={maxlength}
                        onChange={handleOnChange}
                    />
                    {maxlength && (
                        <span className={style.letter_counter}>
                            Caracteres restantes: {letterCount}
                        </span>
                    )}
                </>
            ) : (
                <input
                    type={type}
                    name={name}
                    id={id}
                    required={required}
                    defaultValue={value}
                    accept={accept}
                    placeholder={placeholder}
                    onChange={(e) => handleOnChange(e)}
                />
            )}
        </label>
    </span>
  )
}

export default FormInput
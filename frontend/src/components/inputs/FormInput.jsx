import style from "./FormInput.module.css"

function FormInput({
    text=undefined,
    type,
    name,
    id=undefined,
    value=undefined,
    accept=undefined,
    placeholder=undefined,
    required=false,
    inlineStyle={},
    onChange=undefined
}) {
    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.readAsDataURL(file)
    })

    const handleOnChange = (e) => {
        if (type === "file") {
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

        }
    }
  return (
    <span className={`${style.form_input} ${type === "hidden" && style.hidden}`} style={inlineStyle}>
        <label htmlFor={name}>
            {text}
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
        </label>
    </span>
  )
}

export default FormInput
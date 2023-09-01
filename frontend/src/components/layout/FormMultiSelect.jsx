import Select from "react-select"
import style from "./FormMultiSelect.module.css"

function FormMultiSelect({ options=[], placeholder, value, onChange }) {
    const handleChange = (e) => {
        onChange(Array.isArray(e) ? e.map(x => x.value) : null)
    }
    let formattedOptions = []
    options.forEach((opt, i) => {
        formattedOptions[i] = {
            label: opt.attributes.name,
            value: opt.id
        }
    })
    return (
        <>
            <Select
                isMulti
                options={formattedOptions}
                placeholder={placeholder}
                onChange={handleChange}
                value={value && value.map(val => formattedOptions[val-1])}
                className={style.form_multi_select}
            />
        </>
    )
}

export default FormMultiSelect
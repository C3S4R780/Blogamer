import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import style from "./FilterSidebar.module.css"
import { API } from "../../constant"

function FilterSidebar({ active, dark }) {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        fetch(`${API}/platforms/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => setPlatforms(data.data))
        .catch(err => console.error(err))
    }, [])

    return (
        <div className={`${style.filter_sidebar} ${dark && style.dark}`}>
            <h2>Plataformas:</h2>
            <ul className={style.filter_sidebar_list}>
                {platforms.map(platform => (
                    <li key={platform.id} className={active === platform.attributes.slug ? style.active : null}>
                        <Link to={`/platforms/${platform.attributes.slug}`}>
                            {platform.attributes.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterSidebar
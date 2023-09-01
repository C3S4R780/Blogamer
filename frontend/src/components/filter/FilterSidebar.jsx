import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import style from "./FilterSidebar.module.css"
import { API } from "../../constant"

function FilterSidebar({ dark }) {
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
          <li key={platform.id}>
            <Link to={`/platforms/${platform.attributes.name.toLowerCase()}`}>{platform.attributes.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterSidebar
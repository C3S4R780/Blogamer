import style from "./ShareSidebar.module.css"

import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa6'

function ShareSidebar() {
    const postUrl = encodeURI(window.location.href)
    const copyUrl = () => {
        const copyBtn = document.querySelector('#copyBtn');
        navigator.clipboard.writeText(postUrl);
        copyBtn.classList.add(`${style.copied}`)
        setTimeout(() => copyBtn.classList.remove(`${style.copied}`), 3000)
    }
    return (
        <div className={style.share_sidebar}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noreferrer">
                <FaFacebookF />
            </a>
            <a href={`https://www.twitter.com/share?url=${postUrl}`} target="_blank" rel="noreferrer">
                <FaTwitter />
            </a>
            <a href={`https://wa.me?text=${postUrl}`} target="_blank" rel="noreferrer">
                <FaWhatsapp />
            </a>
            <button onClick={copyUrl} id="copyBtn">
                <FaLink />
            </button>
        </div>
    )
}

export default ShareSidebar
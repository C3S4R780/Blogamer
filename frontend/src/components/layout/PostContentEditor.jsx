import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './PostContentEditor.css'

function PostContentEditor({ value, handleContent }) {

  return (
    <div className='post_content_editor'>
        <ReactQuill theme="snow" value={value} onChange={value => {handleContent(value)}} />
    </div>
  )
}

export default PostContentEditor
import { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './PostContentEditor.css'

function PostContentEditor({ handleContent }) {
  const [value, setValue] = useState('');
  const updateContent = (val) => {
    setValue(val)
    handleContent(val)
  }

  return (
    <div className='post_content_editor'>
        <ReactQuill theme="snow" value={value} onChange={(val) => {updateContent(val)}} />
    </div>
  )
}

export default PostContentEditor
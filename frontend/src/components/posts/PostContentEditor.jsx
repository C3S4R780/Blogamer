import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './PostContentEditor.css'

function PostContentEditor({ value, handleContent }) {
  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, false]}],
      [{'align': []}, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }
  const formats = [
    'header',
    'align', 'indent', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'ordered', 'bullet',
    'link', 'image', 'video'
  ]
  return (
    <div className='post_content_editor'>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={value => handleContent(value)}
          modules={modules}
          formats={formats}
        />
    </div>
  )
}

export default PostContentEditor
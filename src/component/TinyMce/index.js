import React, { useEffect, useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';

const CreateSport = ({ getContentTinyMce, setDataTinyMce }) => {
  const editorRef = useRef(null);

  // Set the initial HTML content
  const initialContent = setDataTinyMce;

  const [valueTiny, setValueTiny] = useState(initialContent);

  const handleEditorChange = (content, editor) => {
    setValueTiny(content);
    getContentTinyMce(content);
  };

  const tinyMceLogger = () => {
    console.log(valueTiny);
  };

  useEffect(() => {
    tinyMceLogger();
  }, [valueTiny]);

  return (
    <div>
      <Editor
        apiKey={process.env.REACT_APP_API_KEY_TINYMCE}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
        value={setDataTinyMce}
        initialValue={getContentTinyMce} // Set the initial content here
        init={{
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'help',
            'image',
            'link',
            'lists',
            'searchreplace',
            'table',
            'wordcount',
          ],
          toolbar:
            'undo redo | formatselect | fontselect | fontsize | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        }}
      />
    </div>
  );
};

export default CreateSport;

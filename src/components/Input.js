import React from "react";
import Dropzone from "react-dropzone";

const Input = ({ onDrop, setUserText, updateTemplate }) => {
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setUserText(newText);
    updateTemplate(newText); // Callback to update the template
  };

  return (
    <div className="flex flex-col items-center w-3/4 mx-auto">
      <div className="my-4 w-full">
        <label htmlFor="userText" className="mr-2">
          Add your tagline/name :
        </label>
        <input
          type="text"
          id="userText"
          onChange={handleTextChange}
          className="border-2 border-gray-300 px-4 py-2 rounded w-full"
        />
      </div>
      <Dropzone onDrop={onDrop} className="w-full">
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer w-full"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">
              Drag/drop your photo here, or click to select a file
            </p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default Input;

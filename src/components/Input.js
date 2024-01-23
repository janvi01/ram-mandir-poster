import React from "react";
import Dropzone from "react-dropzone";

const Input = ({ onDrop, setUserText }) => {
  return (
    <div>
      <div className="m-4">
        <label htmlFor="userText" className="mr-2">
          Add your tagline/name :
        </label>
        <input
          type="text"
          id="userText"
          onChange={(e) => setUserText(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded"
        />
      </div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer"
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

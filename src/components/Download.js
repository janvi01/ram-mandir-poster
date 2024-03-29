import React from "react";

const Download = ({ resultImage, handleDownload }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      {resultImage && (
        <div className="text-center">
          <img
            src={resultImage}
            alt="Result"
            className="max-w-full mb-4"
            style={{ height: "auto", maxHeight: "50vh" }}
          />
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
          >
            Download Poster
          </button>
        </div>
      )}
    </div>
  );
};

export default Download;

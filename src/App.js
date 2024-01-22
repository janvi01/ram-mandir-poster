import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import ramMandirTemplate from "./ram_mandir_template.jpg";

const App = () => {
  const [resultImage, setResultImage] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const [userText, setUserText] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = ramMandirTemplate;
    img.onload = () => {
      setTemplateImage(img);
      setTemplateLoaded(true);
    };
  }, []);

  const handleDrop = (acceptedFiles) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const userImage = new Image();
      userImage.src = event.target.result;

      userImage.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = templateImage.width;
        canvas.height = templateImage.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(templateImage, 0, 0);

        // the user-uploaded image at the desired position and size
        ctx.drawImage(userImage, 70, 250, 230, 230);

        // user - inputted text styling
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "orange";
        ctx.fillText(userText, canvas.width / 2, canvas.height - 30);

        const resultDataURL = canvas.toDataURL("image/png");
        setResultImage(resultDataURL);
      };
    };

    reader.readAsDataURL(acceptedFiles[0]);
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = "ram_mandir_poster.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">
        Ram Mandir Inauguration Poster Maker
      </h1>
      {templateLoaded && (
        <div>
          <div className="m-4">
            <label htmlFor="userText" className="mr-2">
              Add your tagline/name :
            </label>
            <input
              type="text"
              id="userText"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded"
            />
          </div>
          <Dropzone onDrop={handleDrop}>
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
          <img
            src={ramMandirTemplate}
            alt="Template"
            className="max-w-full m-4"
            style={{
              display: resultImage ? "none" : "block",
              height: "auto",
              maxHeight: "50vh",
            }}
          />
        </div>
      )}
      {resultImage && (
        <div className="mt-8">
          <img
            src={resultImage}
            alt="Result"
            className="max-w-full mb-4"
            style={{ height: "auto", maxHeight: "50vh" }}
          />
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Download Poster
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

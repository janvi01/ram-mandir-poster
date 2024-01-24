import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import TemplateDisplay from "./components/TemplateDisplay";
import Download from "./components/Download";
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
        ctx.fillText(userText, canvas.width / 2, canvas.height - 50);

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

  const updateTemplate = (text) => {
    if (templateLoaded) {
      const canvas = document.createElement("canvas");
      canvas.width = templateImage.width;
      canvas.height = templateImage.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(templateImage, 0, 0);

      // user - inputted text styling
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "orange";
      ctx.fillText(text, canvas.width / 2, canvas.height - 50);

      const updatedTemplateDataURL = canvas.toDataURL("image/png");
      setResultImage(updatedTemplateDataURL);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Ram Mandir Inauguration Poster Maker
      </h1>
      <Input
        onDrop={handleDrop}
        setUserText={setUserText}
        updateTemplate={updateTemplate}
      />
      <TemplateDisplay
        templateLoaded={templateLoaded}
        resultImage={resultImage}
        templateSrc={ramMandirTemplate}
      />
      <Download resultImage={resultImage} handleDownload={handleDownload} />
    </div>
  );
};

export default App;

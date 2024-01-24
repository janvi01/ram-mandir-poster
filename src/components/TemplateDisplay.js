import React from "react";

const TemplateDisplay = ({ templateLoaded, resultImage, templateSrc }) => {
  return (
    <div className="flex items-center justify-center">
      {templateLoaded && (
        <div>
          <img
            src={templateSrc}
            alt="Template"
            className="max-w-full my-4"
            style={{
              display: resultImage ? "none" : "block",
              height: "auto",
              maxHeight: "50vh",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TemplateDisplay;

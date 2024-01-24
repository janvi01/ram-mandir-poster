import React from "react";

const TemplateDisplay = ({ templateLoaded, resultImage, templateSrc }) => {
  return (
    <div>
      {templateLoaded && (
        <div>
          <img
            src={templateSrc}
            alt="Template"
            className="max-w-full mb-4 mt-4"
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

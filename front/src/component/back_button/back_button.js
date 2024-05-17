import React from "react";
import ArrowImg from "../../image/svg/arrow-back.svg";

const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="back-button" onClick={handleBack}>
      <img src={ArrowImg} alt="<" width="16" height="16" />
    </div>
  );
};

export default BackButton;

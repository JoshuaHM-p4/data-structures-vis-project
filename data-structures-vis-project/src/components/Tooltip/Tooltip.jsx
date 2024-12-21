import React from 'react';

const Tooltip = ({ children, text, optionalText = "", position = "top" }) => {
  let positionClasses;
  let arrowClasses;

  switch (position) {
    case "top":
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      arrowClasses = "left-1/2 transform -translate-x-1/2 -bottom-1";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 transform -translate-x-1/2 mt-2";
      arrowClasses = "left-1/2 transform -translate-x-1/2 -top-1 rotate-[225deg]";
      break;
    case "left":
      positionClasses = "right-full top-1/2 transform -translate-y-1/2 mr-2";
      arrowClasses = "top-1/2 transform -translate-y-1/2 -right-1 rotate-[315deg]";
      break;
    case "right":
      positionClasses = "left-full top-1/2 transform -translate-y-1/2 ml-2";
      arrowClasses = "top-1/2 transform -translate-y-1/2 -left-1 -rotate-[225deg]";
      break;
    default:
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      arrowClasses = "left-1/2 transform -translate-x-1/2 -bottom-1";
  }

  return (
    <div className="relative inline-block group">
      {children}
      <div className={`absolute invisible z-50 opacity-0 group-hover:visible group-hover:opacity-100 ${positionClasses} transition-all duration-300 ease-in-out` }>
        <div className="relative px-4 py-2 text-[10px] text-white bg-gray-900 rounded-lg backdrop-blur-sm bg-opacity-90 border border-gray-700/50 shadow-xl w-60 text-center">
          <div className="flex items-center space-x-2 flex-col">
            <span>{text}</span>
            <span>{optionalText}</span>
          </div>
          <div className={`absolute w-2 h-2 bg-gray-900 border-r border-b border-gray-700/50 transform rotate-45 ${arrowClasses}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
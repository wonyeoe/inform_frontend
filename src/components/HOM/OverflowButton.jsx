const OverflowButton = ({ count, dateKey, onOverflowClick, isMini }) => {
  if (isMini) {
    return <div className="text-xs text-gray-400 leading-none py-0">....</div>;
  } else {
    return (
      <button
        onClick={() => onOverflowClick(dateKey)}
        className="text-xs sm:text-sm text-gray-600 hover:text-main-component hover:font-semibold transition-colors px-1 py-0.5 rounded"
      >
        +{count}
      </button>
    );
  }
};

export default OverflowButton;

import React, { useEffect, useRef } from 'react';

const ParagraphHighlighter = ({ paragraph, sentenceToHighlight }) => {
  const highlightRef = useRef(null);

  const parts = paragraph.split(new RegExp(`(${sentenceToHighlight})`, 'gi'));

  useEffect(() => {
    if (highlightRef.current) {
      setTimeout(() => {
        highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 2000); // 2 seconds delay
    }
  }, [sentenceToHighlight, paragraph]);

  return (
    <div className="text-white text-5xl">
      {parts.map((part, index) => (
        <span
          key={index}
          ref={part.toLowerCase() === sentenceToHighlight.toLowerCase() ? highlightRef : null}
          className={`${
            part.toLowerCase() === sentenceToHighlight.toLowerCase()
              ? 'bg-yellow-300'
              : 'bg-transparent'
          }`}
        >
          {part}
        </span>
      ))}
    </div>
  );
};

export default ParagraphHighlighter;

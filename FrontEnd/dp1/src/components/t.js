import React from 'react';
import ParagraphHighlighter from './test';

function t() {
  const paragraph = 'This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.This is a sample paragraph. It contains multiple sentences. Highlight this sentence in particular.';
  const sentenceToHighlight = 'Highlight this sentence in particular';

  return (
    <div className="p-8 bg-gray-800 h-screen">
      <h1 className="text-white text-3xl mb-4">Sentence Highlighter</h1>
      <ParagraphHighlighter paragraph={paragraph} sentenceToHighlight={sentenceToHighlight} />
    </div>
  );
}

export default t;

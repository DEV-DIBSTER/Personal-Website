'use client';

import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme.
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (code && language) {
      // Escape HTML to prevent XSS.
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      const highlighted = Prism.highlight(escapedCode, Prism.languages[language] || Prism.languages.javascript, language);
      setHighlightedCode(highlighted);
    }
  }, [code, language]);

  return (
    <div className="code-block relative">
      <div className="absolute top-2 right-2 z-10">
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
          {language}
        </span>
      </div>
      <pre className="language-{language} bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code 
          className="language-{language}"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
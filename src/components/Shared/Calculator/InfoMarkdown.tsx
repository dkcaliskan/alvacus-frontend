// Api & Core imports
import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Types
type MarkdownTypes = {
  markdown: string;
};

const InfoMarkdown: FunctionComponent<MarkdownTypes> = ({ markdown }) => {
  return (
    <div className='prose max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw as any]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default InfoMarkdown;

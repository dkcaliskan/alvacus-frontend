'use client';
// Api & Core imports
import React, { FunctionComponent, useState, useRef } from 'react';

// Components
import AppTextarea from '@/components/Shared/Form/AppTextarea';
import Markdown from '@/components/Shared/Calculator/InfoMarkdown';

// Types
type InfoStateTypes = {
  value: string;
  error: string;
  isMarkdown: boolean;
};
type InfoInputTypes = {
  infoStates: InfoStateTypes;
  setInfoStates: React.Dispatch<React.SetStateAction<InfoStateTypes>>;
};

const InfoInput: FunctionComponent<InfoInputTypes> = ({
  infoStates,
  setInfoStates,
}) => {
  const previewRef = useRef<null | HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If markdown is enabled then convert # to ## for "h" tags
    if (infoStates.isMarkdown) {
      const markdown = e.target.value.replaceAll('# ', '## ');
      setInfoStates({
        ...infoStates,
        value: e.target.value,
        error: '',
      });
    }
    // Return normal text
    else {
      setInfoStates({
        ...infoStates,
        value: e.target.value,
        error: '',
      });
    }
  };

  const blurHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Check if info is empty
    if (!e.target.value) {
      setInfoStates({
        ...infoStates,
        error: 'Info is required',
      });
    }
  };

  const toggleMarkdown = () => {
    setInfoStates({
      ...infoStates,
      isMarkdown: !infoStates.isMarkdown,
    });

    // Scroll to top of preview
    if (infoStates.isMarkdown && previewRef.current) {
      previewRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  return (
    <div>
      <div className='relative'>
        <AppTextarea
          label='Info'
          id='info'
          placeholder='Enter any additional information that users should know about the formula'
          value={infoStates.value}
          onChange={changeHandler}
          onBlur={blurHandler}
          customStyle='h-60 rounded-tr-none'
          error={infoStates.error}
        />

        <div className='absolute top-1 right-0'>
          <div>
            {infoStates.isMarkdown && (
              <button
                type='button'
                className={`rounded-r-none rounded-bl-none btn btn-outline btn-sm no-animation btn-info create-border-color`}
                onClick={() => setIsPreview(!isPreview)}
              >
                {isPreview ? 'Close preview' : 'Preview'}
              </button>
            )}
            <button
              type='button'
              className={`${
                infoStates.isMarkdown ? 'rounded-l-none' : ' rounded-bl-none'
              } rounded-br-none btn btn-outline create-border-color btn-sm no-animation `}
              onClick={toggleMarkdown}
            >
              {infoStates.isMarkdown ? 'Markdown mode' : 'Normal editor'}
            </button>
          </div>
        </div>
      </div>
      <div>
        {isPreview && (
          <div ref={previewRef}>
            <h2 className='text-xl font-bold mt-3'>Markdown Preview</h2>
            <div className='bg-base-100 p-3 rounded-lg my-3'>
              <Markdown markdown={infoStates.value} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoInput;

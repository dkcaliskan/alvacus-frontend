'use client';

// Api & Core
import React, { FunctionComponent, useState } from 'react';
import { usePathname } from 'next/navigation';

// Icons & UI
import { AiOutlineShareAlt } from 'react-icons/ai';

// Components
import Toast from '@/components/Shared/UiElements/Toast';
import Loader from '@/components/Shared/UiElements/Loader';

const ShareButton: FunctionComponent = () => {
  const pathname = usePathname();

  const [copySuccess, setCopySuccess] = useState(false);
  const [animation, setAnimation] = useState('open');

  const textToCopy = `https://www.Alvacus.com${pathname}`;

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        setCopySuccess(true);
        setAnimation('open');
      },
      function (err) {}
    );

    await new Promise((r) => setTimeout(r, 2000));
    setCopySuccess(false);
    setAnimation('close');
  };

  return (
    <div>
      <div className='tooltip tooltip-top' data-tip={'Copy link'}>
        <button
          className='btn btn-ghost '
          onClick={copyToClipboard}
          id='copy-link'
          name='copy-link'
          type='button'
          aria-label='Copy link'
        >
          <AiOutlineShareAlt size={26} />
        </button>
      </div>

      {copySuccess && (
        <Toast
          message='Successfully copied to clipboard!'
          status='alert-success'
          customStyle={`golden-drawer ${animation}`}
        />
      )}
    </div>
  );
};

export default ShareButton;

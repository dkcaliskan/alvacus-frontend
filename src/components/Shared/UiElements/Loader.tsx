import React, { FunctionComponent } from 'react';
import Image from 'next/image';

// Types
type LoaderTypes = {
  customStyle?: string;
  width?: number;
  height?: number;
};

const Loader: FunctionComponent<LoaderTypes> = ({
  customStyle,
  width = 100,
  height = 100,
}) => {
  return (
    <div
      className={`${
        customStyle
          ? customStyle
          : 'w-full h-[200px] mx-auto flex justify-center items-center'
      }`}
    >
      <Image
        src='/assets/icons/spinner.svg'
        alt='Alvacus, spinner'
        width={width}
        height={height}
        className='mx-auto'
        placeholder='blur'
        blurDataURL='/assets/icons/spinner.svg'
      />
    </div>
  );
};

export default Loader;

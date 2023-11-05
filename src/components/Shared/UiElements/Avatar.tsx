// Api & Core imports
import React, { FunctionComponent } from 'react';
import Image from 'next/image';
// Icons & Ui

// Hooks
import useUser from '@/hooks/auth/useUser';

// Types
type AvatarTypes = {
  width: number;
  height: number;
  customStyle?: string;
};

const Avatar: FunctionComponent<AvatarTypes> = ({
  width = 94,
  height = 94,
  customStyle,
}) => {
  const { user, isLoading, error } = useUser();

  // If not user or loading or error, return placeholder
  if (!user || isLoading || error) {
    return (
      <div
        className={`${
          customStyle
            ? customStyle
            : 'mask mask-squircle bg-base-content h-24 w-24 bg-opacity-[0.01] p-px'
        }`}
      >
        <Image
          src={`${'/assets/images/profile-placeholder.png'}`}
          className='mask mask-squircle'
          width={width}
          height={height}
          alt={`Alvacus profile picture placeholder`}
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        customStyle
          ? customStyle
          : 'mask mask-squircle bg-base-content h-24 w-24 bg-opacity-[0.01] p-px'
      } avatar `}
    >
      <Image
        src={`${
          user?.avatar ? user.avatar : '/assets/images/profile-placeholder.png'
        }`}
        className='mask mask-squircle object-contain'
        width={width}
        height={height}
        alt={`${user?.username} Alvacus profile picture`}
      />
    </div>
  );
};

export default Avatar;

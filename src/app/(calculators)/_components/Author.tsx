'use client';

// API & Core
import React, { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types
type AuthorTypes = {
  author?: {
    _id: string;
    username: string;
    avatar: string;
    profession: string;
    company: string;
  };
};

const Author: FunctionComponent<AuthorTypes> = ({ author }) => {
  const blurredUrl =
    author && author.avatar != undefined
      ? author?.avatar.split('/upload')[0] +
        '/blur:1200' +
        author?.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  return (
    <div className='flex items-center md:pt-1.5 pb-1 '>
      <div className='mask mask-squircle bg-base-content min-h-[50px] min-w-[50px] bg-opacity-[0.01]'>
        <Image
          src={
            author && author.avatar != undefined
              ? author.avatar
              : '/assets/images/profile-placeholder.png'
          }
          alt={`Alvacus, ${author ? author.username : '[deleted user]'}`}
          width={50}
          height={50}
          className='mask mask-squircle'
          placeholder='blur'
          blurDataURL={blurredUrl}
        />
      </div>

      <div>
        <div className='pl-1.5 flex items-center'>
          <Link
            href={`${author ? `/profile/${author._id}` : ''}`}
            className={` ${
              !author
                ? 'disabled pointer-events-none text-gray-600'
                : 'link link-hover'
            }`}
          >
            {author ? `@${author.username}` : '[deleted user]'}
          </Link>
        </div>
        <div className='pl-1.5'>
          {author && (
            <p className='text-xs text-gray-500 line-clamp-1'>
              {author.profession &&
                (author.company
                  ? `${author.profession} at ${author.company}`
                  : author.profession)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;

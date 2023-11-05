'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import ReplyReport from './ReplyReport';

import ReplyDelete from './ReplyDelete';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useRelativeTime from '@/hooks/useRelativeTime';

// Types
type ReplyCardTypes = {
  calculatorId: string;
  calculatorTitle: string;
  sortType: string;
  commentPostLoading: boolean;
  setCommentPostLoading: (commentPostLoading: boolean) => void;
  reply: {
    _id: string;
    author?: {
      _id: string;
      username: string;
      avatar: string;
      profession: string;
      company: string;
    };
    text: string;
    createdAt: Date;
  };
  commentId: string;
};

const ReplyCard: FunctionComponent<ReplyCardTypes> = ({
  calculatorId,
  calculatorTitle,
  reply,
  sortType,
  commentId,
}) => {
  const { user } = useUser();
  const controlledDate = useRelativeTime(reply.createdAt);

  const blurredUrl =
    reply && reply.author?.avatar != undefined
      ? reply.author?.avatar.split('/upload')[0] +
        '/blur:1200' +
        reply.author?.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  return (
    <div className='card rounded-t-none pt-3 z-10 border-t-[1px] create-border-color mt-3 relative '>
      <div className='absolute -left-5 -top-[20px] h-full bg-primary/50 w-[1px]'></div>
      <div className='absolute -left-5 top-[80px] h-[1px] bg-primary/50 w-[40px]'></div>
      <div className='flex items-center justify-between md:px-1'>
        <div className='flex items-center '>
          <div className='mask mask-squircle bg-base-content h-[40px] w-[40px] bg-opacity-[0.01]'>
            <Image
              src={
                reply.author && reply.author.avatar
                  ? reply.author.avatar
                  : '/assets/images/profile-placeholder.png'
              }
              alt={`Alvacus, ${
                reply.author ? reply.author.username : '[deleted user]'
              }`}
              width={40}
              height={40}
              className='mask mask-squircle'
              placeholder='blur'
              blurDataURL={
                reply.author?.avatar
                  ? blurredUrl
                  : '/assets/images/profile-placeholder.png'
              }
            />
          </div>

          <div>
            <div className='pl-1.5'>
              <Link
                href={`${reply.author ? `/profile/${reply.author._id}` : ''}`}
                className={`smallestMobile:text-[14px] ${
                  !reply.author
                    ? 'disabled pointer-events-none text-gray-500'
                    : 'link link-hover'
                }`}
              >
                @{reply.author ? reply.author.username : '[deleted user]'}
              </Link>
              <span className='text-xs text-gray-500 pl-1'>
                · {controlledDate}
              </span>
            </div>
            <div className='pl-1.5 '>
              {reply.author && (
                <p className='text-xs text-gray-500'>
                  {reply.author.profession && reply.author.company
                    ? `${reply.author.profession} at ${reply.author.company}`
                    : reply.author.profession && !reply.author.company
                    ? reply.author.profession
                    : ''}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          {user && user.userId === reply.author?._id && (
            <ReplyDelete
              calculatorId={calculatorId}
              sortType={sortType}
              replyId={reply._id}
              commentId={commentId}
            />
          )}

          <ReplyReport
            calculatorId={calculatorId}
            calculatorTitle={calculatorTitle}
            replyContent={reply.text}
            replyId={reply._id}
          />
        </div>
      </div>
      <div className='py-[10px] pl-[50px] pr-3  '>
        <div className='prose '>
          <p className='break-words'>{reply.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;

'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// UI & Icons
import { BsReply } from 'react-icons/bs';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';

// Components
import Loader from '@/components/Shared/UiElements/Loader';
import CommentDelete from './Delete';
import CommentReport from './Report';
import CreateReply from './Reply/CreateReply';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useRelativeTime from '@/hooks/useRelativeTime';

// Types
import type { CommentResultTypes } from '@/types/comments.d';
import ReplyCard from './Reply/ReplyCard';

type CommentCardTypes = {
  commentCount: number;
  commentIndex: number;
  calculatorId: string;
  sortType: string;
  setSortType: (sortType: string) => void;
  commentPostLoading: boolean;
  setCommentPostLoading: (commentPostLoading: boolean) => void;
  comment: CommentResultTypes;
  calculatorTitle: string;
};

const CommentCard: FunctionComponent<CommentCardTypes> = ({
  commentCount,
  calculatorId,
  calculatorTitle,
  sortType,
  setSortType,
  comment,
  commentPostLoading,
  setCommentPostLoading,
  commentIndex,
}) => {
  const { user, isLoading } = useUser();

  const controlledDate = useRelativeTime(comment.createdAt);

  const [readMore, setReadMore] = useState(3);

  const [isReply, setIsReply] = useState<boolean>(false);
  const [showReply, setShowReply] = useState<boolean>(false);
  const [isReplyLoading, setIsReplyLoading] = useState<boolean>(false);

  const handleReadMore = () => {
    if (comment.replies.length > readMore) {
      setReadMore(readMore + 3);
    }
  };

  const blurredUrl =
    comment && comment.author?.avatar != undefined
      ? comment.author?.avatar.split('/upload')[0] +
        '/blur:1200' +
        comment.author?.avatar.split('/upload')[1]
      : '/assets/images/profile-placeholder.png';

  return (
    <div className={`card py-3 custom-bg-color`}>
      <div className='flex items-center justify-between px-1.5 md:px-3'>
        <div className='flex items-center '>
          <div className='mask mask-squircle bg-base-content h-[45px] w-[45px] bg-opacity-[0.01]'>
            <Image
              src={
                comment.author && comment.author.avatar
                  ? comment.author.avatar
                  : '/assets/images/profile-placeholder.png'
              }
              alt={`Alvacus, ${
                comment.author ? comment.author.username : '[deleted user]'
              }`}
              width={45}
              height={45}
              className='mask mask-squircle'
              placeholder='blur'
              blurDataURL={
                comment.author?.avatar
                  ? blurredUrl
                  : '/assets/images/profile-placeholder.png'
              }
            />
          </div>

          <div>
            <div className='pl-1.5'>
              <Link
                href={`${
                  comment.author ? `/profile/${comment.author._id}` : ''
                }`}
                className={`smallestMobile:text-[14px] ${
                  !comment.author
                    ? 'disabled pointer-events-none text-gray-500'
                    : 'link link-hover'
                }`}
              >
                @{comment.author ? comment.author.username : '[deleted user]'}
              </Link>
              <span className='text-xs text-gray-500 pl-1  smMax:hidden'>
                · {controlledDate}
              </span>
            </div>
            <div className='pl-1.5 '>
              {comment.author && (
                <p className='text-xs text-gray-500'>
                  {comment.author.profession &&
                    (comment.author.company
                      ? `${comment.author.profession} at ${comment.author.company}`
                      : comment.author.profession)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='flex items-center'>
          {user && user.userId === comment.author?._id && (
            <CommentDelete
              sortType={sortType}
              calculatorId={calculatorId}
              commentId={comment._id}
            />
          )}
          {user && (
            <div className='tooltip tooltip-left' data-tip='Reply comment'>
              <button
                type='button'
                className='btn btn-ghost'
                onClick={() => setIsReply(!isReply)}
                aria-label='Reply to comment'
                id='reply-comment-btn'
                name='reply-comment-btn'
              >
                <BsReply size={25} />
              </button>
            </div>
          )}
          <CommentReport
            calculatorId={calculatorId}
            calculatorTitle={calculatorTitle}
            commentContent={comment.text}
            commentId={comment._id}
          />
        </div>
      </div>
      <div className='py-[15px] pr-3'>
        <div className='prose  pl-[50px] lg:pl-[65px]'>
          <p className='break-words'>{comment.text}</p>
        </div>
        <div className='flex items-center py-[5px] pl-[42px] lg:pl-[57px]'>
          {/* <CommentLike
            calculatorId={calculatorId}
            comment={comment}
            sortType={sortType}
          /> */}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className='pl-[46px] lg:pl-[61px] mt-1'>
            <button
              type='button'
              className='text-primary link flex items-center'
              onClick={() => setShowReply(!showReply)}
            >
              <span>
                {showReply ? (
                  <RxTriangleUp size={23} />
                ) : (
                  <RxTriangleDown size={23} />
                )}
              </span>
              {comment.replies.length} replies
            </button>
          </div>
        )}

        <div className=' pl-[50px] lg:pl-[65px]'>
          {isReplyLoading && (
            <div>
              <Loader
                customStyle='w-[100px] h-[100px] mx-auto flex justify-center items-center'
                width={70}
                height={70}
              />
            </div>
          )}
          {showReply && !isReplyLoading && (
            <div>
              {comment.replies &&
                comment.replies.length > 0 &&
                comment.replies.slice(0, readMore).map((reply, i) => (
                  <div key={i}>
                    <ReplyCard
                      calculatorId={calculatorId}
                      commentId={comment._id}
                      calculatorTitle={calculatorTitle}
                      commentPostLoading={commentPostLoading}
                      setCommentPostLoading={setCommentPostLoading}
                      reply={reply}
                      sortType={sortType}
                    />
                  </div>
                ))}
              {comment.replies && comment.replies.length > readMore && (
                <button
                  type='button'
                  onClick={handleReadMore}
                  className='pl-3 link  text-sm'
                >
                  Show more
                </button>
              )}
            </div>
          )}

          <div>
            <CreateReply
              calculatorId={calculatorId}
              isReply={isReply}
              setShowReply={setShowReply}
              setIsReplyLoading={setIsReplyLoading}
              sortType={sortType}
              isReplyLoading={isReplyLoading}
              commentId={comment._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

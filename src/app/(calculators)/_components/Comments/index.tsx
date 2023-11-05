'use client';

import React, { FunctionComponent, useRef, useState } from 'react';
import Link from 'next/link';

// Components
import Loader from '@/components/Shared/UiElements/Loader';
import CommentList from './CommentList';

// Hooks
import useUser from '@/hooks/auth/useUser';
import useComments from '@/hooks/calculators/useComments';
import CreateComment from './CreateComment';

// Types
type CommentPageTypes = {
  calculatorId: string;
  calculatorTitle: string;
};

const Comments: FunctionComponent<CommentPageTypes> = ({
  calculatorId,
  calculatorTitle,
}) => {
  const { user, isLoading: userLoading } = useUser();

  const commentRef = useRef<HTMLDivElement>(null);
  const [sortType, setSortType] = useState('popular');
  const [commentPostLoading, setCommentPostLoading] = useState(false);

  const { comments, isReachedEnd, error, size, setSize, isLoading } =
    useComments({
      id: calculatorId,
      sortType,
    });

  if (userLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  /* if (!user && !userLoading) {
    return (
      <div>
        <div className='custom-bg-color p-3 pb-6 rounded-lg lg:rounded-box mt-3'>
          <div className='flex items-center justify-between'>
            <h2
              className=' text-2xl lg:text-3xl font-semibold lgMax:text-center'
              ref={commentRef}
            >
              Comments
            </h2>
            <div className='flex items-center gap-1'>
              <button
                type='button'
                className={`${
                  sortType === 'popular'
                    ? 'btn btn-sm btn-outline btn-active '
                    : 'btn btn-sm btn-ghost'
                }`}
                onClick={() => setSortType('popular')}
              >
                Popular
              </button>
              <button
                type='button'
                className={`${
                  sortType === 'recent'
                    ? 'btn btn-sm btn-outline btn-active '
                    : 'btn btn-sm btn-ghost'
                }`}
                onClick={() => setSortType('recent')}
              >
                Recent
              </button>
            </div>
          </div>
          <div className='px-3 mt-6 flex items-center'>
            <div className='flex items-center gap-1.5 prose'>
              <span>Please</span>
              <Link href='/login' className='link'>
                Login
              </Link>
              <span>to comment.</span>
            </div>
          </div>
          <div>
            <CommentList
              calculatorId={calculatorId}
              calculatorTitle={calculatorTitle}
              commentRef={commentRef}
              commentPostLoading={commentPostLoading}
              setCommentPostLoading={setCommentPostLoading}
            />
          </div>
        </div>
      </div>
    );
  } */

  return (
    <div>
      <div className='custom-bg-color p-3 pb-6 rounded-lg lg:rounded-box mt-3'>
        <div className='flex items-center justify-between'>
          <h2
            className=' text-2xl lg:text-3xl font-semibold lgMax:text-center'
            ref={commentRef}
          >
            Comments
          </h2>
          <div className='flex items-center extraSmallMobile:pl-1 sm:gap-1'>
            <button
              type='button'
              className={`${
                sortType === 'popular'
                  ? 'btn btn-sm btn-outline btn-active '
                  : 'btn btn-sm btn-ghost'
              }`}
              onClick={() => setSortType('popular')}
            >
              Popular
            </button>
            <button
              type='button'
              className={`${
                sortType === 'recent'
                  ? 'btn btn-sm btn-outline btn-active '
                  : 'btn btn-sm btn-ghost'
              }`}
              onClick={() => setSortType('recent')}
            >
              Recent
            </button>
          </div>
        </div>
        <div>
          {user && (
            <CreateComment
              calculatorId={calculatorId}
              sortType={sortType}
              setSortType={setSortType}
              commentPostLoading={commentPostLoading}
              setCommentPostLoading={setCommentPostLoading}
            />
          )}
          {/* <CreateComment
            calculatorId={id}
            sortType={sortType}
            setSortType={setSortType}
            commentPostLoading={commentPostLoading}
            setCommentPostLoading={setCommentPostLoading}
          /> */}
        </div>
      </div>
      <div className=''>
        <CommentList
          calculatorId={calculatorId}
          calculatorTitle={calculatorTitle}
          sortType={sortType}
          setSortType={setSortType}
          commentRef={commentRef}
          commentPostLoading={commentPostLoading}
          setCommentPostLoading={setCommentPostLoading}
        />
        {/*  <CommentList
            calculatorId={id}
            calculatorTitle={calculatorTitle}
            sortType={sortType}
            commentRef={commentRef}
            commentPostLoading={commentPostLoading}
            setCommentPostLoading={setCommentPostLoading}
          /> */}
      </div>
    </div>
  );
};

export default Comments;

'use client';
// Api & Core imports
import React, { FunctionComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import Loader from '@/components/Shared/UiElements/Loader';
import CommentCard from './CommentCard';

// Hooks
import useComments from '@/hooks/calculators/useComments';

// Types
import { CommentResultTypes } from '@/types/comments';
type CommentListTypes = {
  calculatorId: string;
  calculatorTitle: string;
  sortType: string;
  setSortType: (sortType: string) => void;
  commentRef: React.RefObject<HTMLDivElement>;
  commentPostLoading: boolean;
  setCommentPostLoading: (commentPostLoading: boolean) => void;
};

const CommentList: FunctionComponent<CommentListTypes> = ({
  calculatorId,
  commentRef,
  sortType,
  setSortType,
  calculatorTitle,
  commentPostLoading,
  setCommentPostLoading,
}) => {
  // Get comments from useComments hook
  const { comments, isReachedEnd, size, setSize, isLoading } = useComments({
    id: calculatorId,
    sortType,
  });

  // If reached to the end show this message
  const endMessage = (
    <div>
      {comments && comments.length > 3 && (
        <div className='card py-6 '>
          <p className='text-center text-gray-500 text-sm'>
            Reached to the end.
          </p>
          <div className='w-full mx-auto mt-3 text-center'>
            <button type='button' className=' '>
              <a href='#' className='btn btn-secondary btn-sm'>
                Back to top
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // If there is no comment and loading
  if (!comments && isLoading) {
    return <Loader />;
  }

  // If there is no comment
  if (comments && comments.length === 0 && !isLoading) {
    return (
      <div className=' custom-bg-color rounded-box w-full'>
        <div className='relative min-h-[170px] max-w-[500px] mx-auto mt-3 py-6'>
          <div className='-ml-12'>
            <div className='custom-sort-bg w-[250px] h-[70px] rounded-lg shadow-lg flex mx-auto'>
              <div className='custom-bg-color mask mask-squircle w-10 h-10 ring-2 ring-primary m-3'></div>
              <div>
                <div className='custom-bg-color w-[150px] h-[15px] rounded-md mt-3'></div>
                <div className='custom-bg-color w-[75px] h-[15px] rounded-md mt-3'></div>
              </div>
            </div>
            <div className='custom-sort-bg w-[250px] h-[70px] rounded-lg shadow-lg flex mx-auto absolute right-9 top-12'>
              <div className='custom-bg-color mask mask-squircle w-10 h-10 ring-2 ring-secondary m-3'></div>
              <div>
                <div className='custom-bg-color w-[150px] h-[15px] rounded-md mt-3'></div>
                <div className='custom-bg-color w-[75px] h-[15px] rounded-md mt-3'></div>
              </div>
            </div>
          </div>
          <div>
            <p className='text-2xl font-semibold text-center mt-[60px] py-2'>
              No comment yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-3 ' ref={commentRef}>
      {commentPostLoading && (
        <div>
          <Loader
            customStyle='w-[100px] h-[100px] mx-auto flex justify-center items-center'
            width={70}
            height={70}
          />
        </div>
      )}
      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!isReachedEnd}
        loader={<Loader />}
        endMessage={endMessage}
        dataLength={comments?.length!}
      >
        {comments?.map((comment: CommentResultTypes, i: number) => (
          <div key={i} className='py-1.5'>
            <CommentCard
              commentCount={comments?.length || 0}
              commentIndex={i}
              calculatorId={calculatorId}
              calculatorTitle={calculatorTitle}
              sortType={sortType}
              setSortType={setSortType}
              comment={comment}
              commentPostLoading={commentPostLoading}
              setCommentPostLoading={setCommentPostLoading}
            />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentList;

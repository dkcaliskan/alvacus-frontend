import React from 'react';

const CommentsSkeleton = () => {
  return (
    <div>
      <div className='w-full custom-bg-color p-3 pb-6 rounded-lg lg:rounded-box mt-3 animate-pulse'>
        <div className='flex items-center justify-between'>
          <div className='bg-base-content w-[170px] h-[20px] rounded-lg'></div>
          <div className='flex items-center gap-2'>
            <div className='bg-base-content w-[85px] h-[20px] rounded-lg'></div>
            <div className='bg-base-content w-[85px] h-[20px] rounded-lg'></div>
          </div>
        </div>
        <div className='bg-base-content w-full h-[30px] rounded-md mt-3'></div>
      </div>
      <div className='w-full custom-bg-color p-3 pb-6 rounded-lg lg:rounded-box mt-3 animate-pulse'>
        <div className='mt-3 flex items-center'>
          <div className='bg-base-content w-[40px] h-[40px] rounded-full '></div>
          <div>
            <div className='bg-base-content w-[100px] h-[10px] rounded-lg'></div>
            <div className='bg-base-content w-[70px] h-[10px] rounded-lg mt-1.5'></div>
          </div>
        </div>

        <div className='bg-base-content w-full h-[10px] rounded-lg mt-3'></div>
        <div className='bg-base-content w-full h-[10px] rounded-lg mt-1.5'></div>
        <div className='bg-base-content w-1/2 h-[10px] rounded-lg mt-1.5'></div>
      </div>
    </div>
  );
};

export default CommentsSkeleton;

import React from 'react';

const ProfileSideSkeleton = () => {
  return (
    <div className='w-full mt-[8.2px] lgMax:max-w-[500px] lgMax:mx-auto animate-pulse'>
      <div className='mt-4'>
        <div className='mb-1.5 flex items-center'>
          <div className='pl-2 w-[30px] custom-bg-color rounded-box h-[30px]'></div>
          <div className='ml-2 w-[100px] custom-bg-color rounded-box h-[27px]'></div>
        </div>
        <div className='custom-bg-color rounded-box mt-[8.7px] h-[155px]'></div>
        <div className='mt-3 custom-bg-color rounded-box h-[267px]'></div>
        <div className='mt-3 custom-bg-color rounded-box h-[267px]'></div>
      </div>
    </div>
  );
};

export default ProfileSideSkeleton;

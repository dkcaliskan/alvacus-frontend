// Api & Core imports
import React, { FunctionComponent } from 'react';

// Types
type UserBadgeTypes = {
  rank: number;
};

const UserBadge: FunctionComponent<UserBadgeTypes> = ({ rank }) => {
  return (
    <div className=''>
      {rank > 0 && rank <= 10 && (
        <p className='border-[1px] p-1 px-2 rounded-lg text-xs create-border-color text-accent'>
          <span className='smallerMobile:hidden'>Formula</span> Enthusiast
        </p>
      )}
      {rank > 10 && rank <= 20 && (
        <p className='border-[1px] p-1 px-2 rounded-lg text-xs create-border-color text-accent'>
          <span className='smallerMobile:hidden'>Formula</span> Expert
        </p>
      )}
      {rank > 20 && rank <= 30 && (
        <p className='border-[1px] p-1 px-2 rounded-lg text-xs create-border-color text-accent'>
          <span className='smallerMobile:hidden'>Formula</span> Master
        </p>
      )}
      {rank > 30 && (
        <p className='border-[1px] p-1 px-2 rounded-lg text-xs create-border-color text-accent'>
          <span className='smallerMobile:hidden'>Formula</span> Guru
        </p>
      )}
    </div>
  );
};

export default UserBadge;

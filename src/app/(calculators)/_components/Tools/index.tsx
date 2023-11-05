'use client';

// Api & Core imports
import React, { FunctionComponent } from 'react';

// Hooks
import useUser from '@/hooks/auth/useUser';
import EditLink from '@/components/Shared/Calculator/EditLink';
import ShareButton from './Share';
import SaveCalculator from '@/components/Shared/Calculator/SaveCalculator';
import Report from './Report';
import DeleteCalculator from './Delete';

// Types
type ToolTypes = {
  authorId: string;
  calcId: string;
  calcType: string;
  calcTitle: string;
  savedUsers: { userId: string }[];
  isShareButton?: boolean;
  isEditLink?: boolean;
  isDeleteButton?: boolean;
  isSaveButton?: boolean;
};

const Tools: FunctionComponent<ToolTypes> = ({
  authorId,
  calcId,
  calcType,
  calcTitle,
  savedUsers,
  isShareButton = true,
  isEditLink = true,
  isDeleteButton = false,
  isSaveButton = true,
}) => {
  const { user, isLoading } = useUser();

  return (
    <div className='flex items-center'>
      {user &&
        isEditLink &&
        (user.userId === authorId || user.role === 'admin') && (
          <EditLink calcType={calcType} calcId={calcId} />
        )}
      {isShareButton && <ShareButton />}

      {isDeleteButton && (
        <DeleteCalculator calculatorId={calcId} calculatorTitle={calcTitle} />
      )}

      <Report calcId={calcId} errorOrigin={calcTitle} />

      {isSaveButton && (
        <SaveCalculator
          calcId={calcId}
          userId={user?.userId}
          savedUsers={savedUsers}
        />
      )}
    </div>
  );
};

export default Tools;

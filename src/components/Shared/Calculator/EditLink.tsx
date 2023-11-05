// Api & Core imports
import React, { FunctionComponent } from 'react';
import Link from 'next/link';

// Icons
import { BsPencil } from 'react-icons/bs';

// Types
type EditLinkType = {
  calcType: string;
  calcId: string;
  customStyle?: string;
  size?: number;
  tooltipDisable?: boolean;
};

const EditLink: FunctionComponent<EditLinkType> = ({
  calcType,
  calcId,
  customStyle,
  size,
  tooltipDisable,
}) => {
  return (
    <div
      className={`${!tooltipDisable && 'tooltip tooltip-left lg:tooltip-top'}`}
      data-tip='Edit your calculator'
    >
      <Link
        href={`/edit/${calcType}/${calcId}`}
        prefetch={false}
        className={`btn ${customStyle ? customStyle : 'btn-ghost'}`}
        aria-label='Edit your calculator'
      >
        <BsPencil role='button' className='text-[#3b82f6]' size={size || 20} />
      </Link>
    </div>
  );
};

export default EditLink;

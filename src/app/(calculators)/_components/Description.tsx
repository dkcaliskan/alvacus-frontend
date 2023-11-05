// Api & Core imports
import React, { FunctionComponent } from 'react';

// Types
type DescriptionTypes = {
  description: string;
};

const Description: FunctionComponent<DescriptionTypes> = ({ description }) => {
  return (
    <div className='custom-bg-color p-3 pb-6 rounded-lg lg:rounded-box mt-3'>
      <h2 className=' text-2xl lg:text-3xl  font-semibold lgMax:text-center'>
        Description
      </h2>
      <div className='prose max-w-none mt-3'>
        {description.split('<br/>').map((text: string, index: number) => (
          <p className='' key={index}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Description;

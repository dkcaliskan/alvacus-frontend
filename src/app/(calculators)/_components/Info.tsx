// Api & Core imports
import React, { FunctionComponent } from 'react';

// Components
import InfoMarkdown from '@/components/Shared/Calculator/InfoMarkdown';

// Types
type InfoTypes = {
  isMarkdown: boolean;
  info: string;
};

const Info: FunctionComponent<InfoTypes> = ({ isMarkdown, info }) => {
  return (
    <div className='custom-bg-color p-3 rounded-lg lg:rounded-box mt-3'>
      <h2 className=' text-2xl lg:text-3xl font-semibold lgMax:text-center'>
        Info
      </h2>

      <div>
        {isMarkdown ? (
          <div>
            <div className={`mt-3`}>
              <InfoMarkdown markdown={info} />
            </div>
          </div>
        ) : (
          <div>
            <div className={`prose max-w-none mt-3`}>
              <p>{info}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;

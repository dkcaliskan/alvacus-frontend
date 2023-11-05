// Api & Core imports
import React, { FunctionComponent } from 'react';

// Types
type UserCalculatorListSelectTypes = {
  selectedList: string;
  setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  showSavedCalculators: boolean;
  showComments: boolean;
};

const UserCalculatorListSelect: FunctionComponent<
  UserCalculatorListSelectTypes
> = ({ selectedList, setSelectedList, showSavedCalculators, showComments }) => {
  return (
    <div>
      <div className='flex items-center -mb-[1px] mt-3'>
        <button
          className={`smallestMobile:px-1.5 px-3 py-[11px] mr-1 transition ${
            selectedList === 'my'
              ? 'custom-bg-color duration-200 border-b-[1px] rounded-tr-xl lg:rounded-t-xl  cursor-default pointer-events-none'
              : 'btn-ghost border-b-[0px] rounded-tr-lg lg:rounded-t-lg'
          } ease-in-out border-b-warning`}
          type='button'
          onClick={() => setSelectedList('my')}
        >
          Created {selectedList === 'my' && 'calculators'}
        </button>

        {showSavedCalculators && (
          <button
            className={`smallestMobile:px-1.5 px-3 py-[11px] mr-1 transition ${
              selectedList === 'saved'
                ? 'custom-bg-color duration-200 border-b-[1px] rounded-tr-xl lg:rounded-t-xl  cursor-default pointer-events-none'
                : 'btn-ghost border-b-[0px] rounded-tr-lg lg:rounded-t-lg'
            } ease-in-out border-b-warning  `}
            onClick={() => setSelectedList('saved')}
          >
            Saved {selectedList === 'saved' && 'calculators'}
          </button>
        )}

        {showComments && (
          <button
            className={`smallestMobile:px-1.5 px-3 py-[11px] mr-1 transition ${
              selectedList === 'comments'
                ? 'custom-bg-color duration-200 border-b-[1px] rounded-tr-xl lg:rounded-t-xl  cursor-default pointer-events-none'
                : 'btn-ghost border-b-[0px] rounded-tr-lg lg:rounded-t-lg'
            } ease-in-out border-b-warning  `}
            onClick={() => setSelectedList('comments')}
          >
            Commented {selectedList === 'comments' && 'calculators'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCalculatorListSelect;

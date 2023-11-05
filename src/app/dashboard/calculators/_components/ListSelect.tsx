'use client';
// API & Core
import React, { useState, FunctionComponent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import ListSelectSkeleton from '@/components/Shared/UiElements/Skeletons/ListSelectSkeleton';

// Contexts, Hooks
import useUser from '@/hooks/auth/useUser';

const ListSelectDashboard: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const list = params.get('list') || 'all';
  const [selectedList, setSelectedList] = useState<string>(list);

  const { user, isValidating, error, isLoading } = useUser();

  const handleSelectList = (list: string) => {
    // Create new URLSearchParams object
    const updateParams = new URLSearchParams(params.toString());

    // Update the list state
    setSelectedList(list);

    // Update the list query
    updateParams.set('list', list);

    // Update the page query to 1 to reset the pagination
    updateParams.set('page', '1');

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());
  };

  // Loading skeleton
  if (isLoading || isValidating) {
    return <ListSelectSkeleton />;
  }

  if (!user || error) {
    return (
      <div>
        <div className='flex items-center -mb-[2px]'>
          <button
            className={`smallestMobile:px-1.5 px-3 py-[11px] mr-1 transition ${
              selectedList === 'all'
                ? 'custom-bg-color duration-200 border-b-[1px] rounded-tr-xl lg:rounded-t-xl'
                : 'btn-ghost border-b-[0px] rounded-tr-lg lg:rounded-t-lg'
            } ease-in-out border-b-warning `}
            onClick={() => handleSelectList('all')}
          >
            All {selectedList === 'all' && 'calculators'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      <div className='flex items-center -mb-[2px]'>
        <button
          className={`smallestMobile:px-1.5 px-3 py-[11px] mr-1 transition ${
            selectedList === 'all'
              ? 'custom-bg-color duration-200 border-b-[1px] rounded-tr-xl lg:rounded-t-xl'
              : 'btn-ghost border-b-[0px] rounded-tr-lg lg:rounded-t-lg'
          } ease-in-out border-b-warning `}
          onClick={() => handleSelectList('all')}
        >
          All {selectedList === 'all' && 'calculators'}
        </button>

        <button
          className={`smallestMobile:px-1.5 px-3 py-[11px] mr-1 transition ${
            selectedList === 'unverified'
              ? 'custom-bg-color duration-200 border-b-[1px] rounded-t-xl'
              : 'btn-ghost border-b-[0px] rounded-t-lg'
          } ease-in-out border-b-warning  `}
          onClick={() => handleSelectList('unverified')}
        >
          Unverified {selectedList === 'unverified' && 'calculators'}
        </button>
      </div>
    </div>
  );
};

export default ListSelectDashboard;

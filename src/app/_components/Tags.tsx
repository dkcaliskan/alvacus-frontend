'use client';

// API & Core
import React, { useState, FunctionComponent } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// UI & Icons
import { AiFillTag } from 'react-icons/ai';

// Hooks

// Types
type TagsTypes = {
  setIsTagsDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Tags: FunctionComponent<TagsTypes> = ({
  setIsTagsDrawerOpen = () => false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Create new URLSearchParams object
  const updateParams = new URLSearchParams(params.toString());

  // Get the tag from the query params
  const tag = params.get('tag');

  // Set the selected tag from the query params or default to all
  const [selectedTag, setSelectedTag] = useState<string>(tag || 'all');

  const tagHandler = (e: string) => {
    setSelectedTag(e);

    // Update the search query
    updateParams.set('tag', e);

    // Update the page query to 1 to reset the pagination
    updateParams.set('page', '1');

    // push the new url with the updated params
    router.push(pathname + '?' + updateParams.toString());

    // Set the drawer to close
    setIsTagsDrawerOpen(false);
  };

  return (
    <div className='w-full mt-3 '>
      <div className=''>
        <div className='flex items-center'>
          <AiFillTag className='text-warning' size={23} />
          <h2 className='pl-1.5 label-text text-xl'>Tags</h2>
        </div>
        <div className='mt-[12px]'>
          <div>
            <button
              className={`${
                selectedTag === 'all'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('all');
              }}
              disabled={selectedTag === 'all' ? true : false}
            >
              All
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'chemistry'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('chemistry');
              }}
              disabled={selectedTag === 'chemistry' ? true : false}
            >
              Chemistry
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'conversion'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('conversion');
              }}
              disabled={selectedTag === 'conversion' ? true : false}
            >
              Conversions
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'engineering'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('engineering');
              }}
              disabled={selectedTag === 'engineering' ? true : false}
            >
              Engineering
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'finance'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('finance');
              }}
              disabled={selectedTag === 'finance' ? true : false}
            >
              Finance
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'geometry'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('geometry');
              }}
              disabled={selectedTag === 'geometry' ? true : false}
            >
              Geometry
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'mathematic'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('mathematic');
              }}
              disabled={selectedTag === 'mathematic' ? true : false}
            >
              Mathematic
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'medical'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('medical');
              }}
              disabled={selectedTag === 'medical' ? true : false}
            >
              Medical
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'physics'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('physics');
              }}
              disabled={selectedTag === 'physics' ? true : false}
            >
              Physics
            </button>
          </div>
          <div className='mt-3'>
            <button
              className={`${
                selectedTag === 'other'
                  ? 'custom-bg-color rounded-full'
                  : 'rounded-lg btn-ghost'
              }  w-full py-[10px] hover:shadow transition ease-in-out duration-200 text-left pl-[20px]`}
              onClick={() => {
                
                tagHandler('other');
              }}
              disabled={selectedTag === 'other' ? true : false}
            >
              Other
            </button>
          </div>
        </div>
        <div className='py-6'>
          <Link
            href={`/create`}
            as={`/create`}
            className='btn min-h-[45px] h-[45px] max-h-[45px] btn-primary w-full rounded-full'
          >
            Create a calculator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tags;

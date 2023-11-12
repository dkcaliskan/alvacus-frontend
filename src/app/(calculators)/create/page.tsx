// Api & Core
import React, { Suspense } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';
import CreateEnlightenment from './_components/Enlightenments';
import Report from '../_components/Tools/Report';

// Dynamic imports
const CreateInputs = dynamic(() => import('./_components/CreateInputs'), {
  ssr: false,
});

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Calculator',
  description: 'Create a calculator for any purpose',
  alternates: {
    canonical: 'https://alvacalculators.com/create',
  },
};

const Create: NextPage = () => {
  return (
    <div>
      <div className='md:pt-1.5 pb-1 border-b-2 lgMax:px-1.5 lgMax:-mt-2'>
        <div className='flex items-center justify-between'>
          <h1 className='mobileMax:text-2xl text-3xl font-bold line-clamp-1'>
            Create a Calculator for Any Purpose
          </h1>
          <Suspense fallback={<div></div>}>
            <Report errorOrigin='Create Calculator' />
          </Suspense>
        </div>
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <section>
            <CreateInputs />
          </section>
        </Suspense>
        <Suspense fallback={<Loader />}>
          <section>
            <CreateEnlightenment />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default Create;

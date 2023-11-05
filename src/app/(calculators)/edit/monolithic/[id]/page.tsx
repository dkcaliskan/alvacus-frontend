// Api & Core imports
import React, { Suspense } from 'react';
import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const MonoEditInputs = dynamic(() => import('./_components/MonoEditLinks'), {
  ssr: false,
});
const Tools = dynamic(() => import('@/app/(calculators)/_components/Tools'), {
  ssr: false,
});

// Server Actions
import getModularCalculator from '@/server-actions/getModularCalculator';

// Types
import { CalculatorTypes } from '@/types/calculators.d';

type MonoPageTypes = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: MonoPageTypes): Promise<Metadata> {
  const calculatorData: Promise<CalculatorTypes> = getModularCalculator({
    calcId: params.id,
  });
  const calculator = await calculatorData;

  if (!calculator) {
    return {
      title: 'Calculator not found',
    };
  }

  return {
    title: calculator.title,
    description: calculator.description,
    openGraph: {
      title: calculator.title + ' | Alvacus',
      description: calculator.description,
    },
  };
}

const MonoEdit: NextPage<MonoPageTypes> = async ({ params }) => {
  // Get calculator data
  const calculatorData: Promise<CalculatorTypes> = getModularCalculator({
    calcId: params.id,
  });
  const calculator = await calculatorData;

  // If calculator is not found, redirect to 404 page
  if (!calculator) {
    notFound();
  }
  return (
    <div>
      <div className='md:pt-1.5 pb-1 border-b-2 lgMax:px-1.5 lgMax:-mt-2'>
        <div className='flex items-center justify-between extraSmallMobile:overflow-auto'>
          <h1 className='mobileMax:text-xl text-2xl lg:text-3xl font-bold line-clamp-1'>
            Edit your calculator
          </h1>
          <div>
            <Suspense fallback={<div></div>}>
              <Tools
                authorId={calculator.author?._id || ''}
                calcId={calculator._id}
                calcType={calculator.type}
                calcTitle={calculator.title}
                savedUsers={calculator.savedUsers}
                isShareButton={false}
                isEditLink={false}
                isSaveButton={false}
                isDeleteButton={true}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <div className='custom-bg-color p-3 rounded-lg lg:rounded-box mt-3'>
        <Suspense fallback={<Loader />}>
          <MonoEditInputs
            baseTitle={calculator.title}
            baseCategory={calculator.category.toLowerCase()}
            baseDescription={calculator.description}
            baseInfo={calculator.info}
            baseIsInfoMarkdown={calculator.isInfoMarkdown}
            authorId={calculator.author?._id || ''}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default MonoEdit;

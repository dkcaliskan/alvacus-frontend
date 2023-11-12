// Api & Core imports
import React, { Suspense } from 'react';
import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Components
import CommentsSkeleton from '@/components/Shared/UiElements/Skeletons/CommentsSkeleton';
import Loader from '@/components/Shared/UiElements/Loader';
import Author from '../../_components/Author';
import Tools from '../../_components/Tools';
import Description from '../../_components/Description';
import Info from '../../_components/Info';

// Dynamic imports
const ModularCalculator = dynamic(() => import('./_components/Calculator'), {
  ssr: false,
  loading: () => <Loader />,
});
const Comments = dynamic(() => import('../../_components/Comments'), {
  ssr: false,
});

// Server Actions
import getModularCalculator from '@/server-actions/getModularCalculator';

// Types
import type { CalculatorTypes } from '@/types/calculators.d';

type ModularPageTypes = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: ModularPageTypes): Promise<Metadata> {
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
    alternates: {
      canonical: 'https://alvacus.com/modular/' + calculator._id,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alvacus',
      title: calculator.title + ' | Alvacus',
      description: calculator.description,
      images: [
        'https://alvacus.com/assets/icons/core/android-chrome-512x512.png',
      ],
    },
  };
}

const Modular: NextPage<ModularPageTypes> = async ({ params }) => {
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
          <div>
            <Suspense fallback={<div></div>}>
              <Author author={calculator.author} />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<div></div>}>
              <Tools
                authorId={calculator.author?._id || ''}
                calcId={calculator._id}
                calcType={calculator.type}
                calcTitle={calculator.title}
                savedUsers={calculator.savedUsers}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <div className='custom-bg-color p-3 rounded-lg lg:rounded-box mt-3'>
        <div className='flex items-center'>
          <h1 className='mobileMax:text-2xl text-3xl  font-bold line-clamp-1'>
            {calculator.title}
          </h1>
          {!calculator.isVerified && (
            <div
              className='ml-1.5 border-[1px] border-warning rounded-lg text-warning px-1.5 text-sm tooltip tooltip-bottom'
              data-tip='Calculator in verification status'
            >
              Pending
            </div>
          )}
        </div>
        <Suspense fallback={<Loader />}>
          <section>
            <ModularCalculator
              formula={calculator.formula}
              formulaLength={calculator.inputLength}
              inputLabels={calculator.inputLabels}
              inputSelects={calculator.inputSelects}
            />
          </section>
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <section>
            <Description description={calculator.description} />
          </section>
        </Suspense>
        <Suspense fallback={<Loader />}>
          <section>
            <Info
              isMarkdown={calculator.isInfoMarkdown}
              info={calculator.info}
            />
          </section>
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments
            calculatorId={calculator._id}
            calculatorTitle={calculator.title}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Modular;

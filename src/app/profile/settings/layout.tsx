// Api & Core imports
import { Suspense } from 'react';

// Components
import SettingsNav from './_components/SettingsNav';
import Loader from '@/components/Shared/UiElements/Loader';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='container mx-auto lg:my-3 lg:px-3 font-main lg:grid lg:grid-cols-9 lg:gap-6 lgMax:mt-3'>
      <div className='w-full lg:col-start-1 col-span-2 '>
        <Suspense fallback={<Loader />}>
          <SettingsNav />
        </Suspense>
      </div>
      <div className='lg:col-span-7'>{children}</div>
    </section>
  );
}

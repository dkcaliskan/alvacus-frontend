// Api & Core imports
import { Suspense } from 'react';

// Components
import ProfileSidebar from '@/components/Shared/ProfileSidebar';
import ProfileSideSkeleton from '@/components/Shared/UiElements/Skeletons/ProfileSideSkeleton';
import Footer from '@/components/Navigation/Footer';

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3 lg:grid lg:grid-cols-9 lg:gap-6 lgMax:mt-3'>
        <div className='lg:col-start-1 lg:col-span-7'>{children}</div>
        <div className='w-full col-span-2 lgMax:hidden'>
          <Suspense fallback={<ProfileSideSkeleton />}>
            <ProfileSidebar />
          </Suspense>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

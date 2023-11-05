const Home = () => {
  return (
    <>
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3 lg:grid lg:grid-cols-9 lg:gap-3 xl:gap-6'>
        test
        {/* <section className='lg:col-start-3 lg:col-span-5'>
          <Suspense fallback={<Loader />}>
            <HomeComponents />
          </Suspense>
        </section> */}
        {/* <section className='lg:order-first lgMax:hidden lg:col-span-2'>
          <Suspense fallback={<Loader />}>
            <Tags />
          </Suspense>
        </section> */}
        {/* <section className='lg:col-span-2 lgMax:hidden'>
          <Suspense fallback={<ProfileSideSkeleton />}>
            <ProfileSidebar />
          </Suspense>
        </section> */}
      </section>
      {/* <section>
        <Footer />
      </section> */}
    </>
  );
};

export default Home;

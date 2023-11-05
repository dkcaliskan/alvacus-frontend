// Api & Core imports
import Link from 'next/link';



const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center with-nav-height lg:with-nav-height-lg px-1.5'>
      <h1 className='text-4xl font-bold lg:-mt-[45px]'>
        404 <span className='text-2xl font-bold'>- Page not found</span>
      </h1>

      <p className='text-center'>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link href='/' className='mt-3 btn btn-primary'>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;

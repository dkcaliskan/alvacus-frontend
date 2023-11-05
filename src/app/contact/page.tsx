// Api & Core imports
import React, { Suspense } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Components
import Loader from '@/components/Shared/UiElements/Loader';

// Dynamic imports
const ContactHandler = dynamic(() => import('./_components/ContactHandler'), {
  ssr: false,
});

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

const Contact: NextPage = async () => {
  return (
    <section>
      <div className='md:pt-1.5 border-b-2 lgMax:px-1.5 pb-3'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl lg:text-3xl font-bold line-clamp-1'>
            Always happy to hear from you!
          </h1>
        </div>
      </div>

      <div className='mt-3'>
        <Suspense fallback={<Loader />}>
          <ContactHandler />
        </Suspense>
      </div>
      <div>
        <div className='custom-bg-color  pt-3 pb-6 px-1.5 lg:px-3 rounded-box mt-3'>
          <div className='prose max-w-none '>
            <p>
              I&apos;m always eager to hear from you! If you have any questions,
              feedback, or concerns, please don&apos;t hesitate to contact me
              using the form below.
            </p>
            <p>
              I typically respond to messages within 24-48 hours, although
              response times may vary during weekends and holidays. Rest assured
              that I value your time and will do my best to address your
              inquiries as soon as possible.
            </p>
            <p>
              If you&apos;re experiencing any technical issues with our app,
              please provide as much detail as possible so I can better assist
              you. Error messages can be especially helpful in diagnosing the
              problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// Api & Core imports
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

// Components
import Footer from '@/components/Navigation/Footer';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  alternates: {
    canonical: 'https://alvacus.com/legal/disclaimer',
  },
};

const Disclaimer: NextPage = async () => {
  return (
    <>
      <section className='container mx-auto lg:my-3 lg:px-3 pb-3'>
        <div className='prose max-w-none px-1.5 mt-6'>
          <h1 className='text-2xl lg:text-3xl'>Disclaimer</h1>
          <p>
            Alvacus is provided &quot;as is&quot; without any representations or
            warranties, express or implied. Alvacus makes no representations or
            warranties in relation to Alvacus or the information and materials
            provided on or through Alvacus.
          </p>
          <p>
            Nothing on Alvacus constitutes, or is meant to constitute, advice of
            any kind. If you require advice in relation to any legal, financial,
            or medical matter, you should consult an appropriate professional.
          </p>
          <p>
            By using Alvacus, you expressly acknowledge and agree that Alvacus
            shall not be responsible for any damages, claims, or other liability
            arising from or related to your use of Alvacus or the information
            and materials provided on or through Alvacus.
          </p>

          <p>
            Furthermore, Alvacus does not guarantee that Alvacus will be free
            from errors or interruptions or that it will be available at all
            times.
          </p>
          <p>
            Alvacus is not responsible for any content that you create or share
            using Alvacus. You retain all rights to any content that you create,
            but by sharing it on Alvacus, you grant Alvacus a non-exclusive,
            royalty-free, transferable, sub-licensable, worldwide license to
            use, store, display, reproduce, modify, and distribute your content
            on and through Alvacus.
          </p>

          <p>
            In no event shall Alvacus be liable for any damages whatsoever,
            including but not limited to direct, indirect, special, punitive, or
            consequential damages, arising out of or in connection with your use
            or inability to use Alvacus or the information and materials
            provided on or through Alvacus.
          </p>
          <p>
            This disclaimer is governed by and construed in accordance with the
            laws of Turkey and any disputes relating to this disclaimer will be
            subject to the exclusive jurisdiction of the courts of Turkey.
          </p>
          <p>
            By using Alvacus, you agree to the terms of this disclaimer. If you
            do not agree to these terms, please do not use Alvacus.
          </p>
          <p>
            For more information, please see
            <Link href='/legal/terms' className='mx-1'>
              Terms of use
            </Link>
            and
            <Link href='/legal/privacy' className='mx-1'>
              Privacy policy
            </Link>
          </p>
          <p>This disclaimer was last updated on 03/04/2023.</p>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Disclaimer;

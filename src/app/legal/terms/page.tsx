// Api & Core imports
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

// Components
import Footer from '@/components/Navigation/Footer';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of use',
  alternates: {
    canonical: 'https://www.alvacus.com/legal/terms',
  },
};

const Terms: NextPage = async () => {
  return (
    <>
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3'>
        <div className='prose max-w-none px-1.5 mt-3'>
          <h1 className='text-2xl lg:text-3xl'>Terms of use</h1>
          <div>
            <h2>
              By using Alvacus, you agree to the following terms and conditions:
            </h2>
            <ul className='list-decimal'>
              <li>
                Intellectual Property Rights: Alvacus is owned and operated by
                Alvacus, and all rights to the app, including intellectual
                property rights, belong to Alvacus. You may not copy, modify,
                distribute, sell, or lease any part of Alvacus without the
                express written consent of Alvacus.
              </li>
              <li>
                User-generated content: You are solely responsible for any
                content that you create or share using Alvacus. You retain all
                rights to any content that you create, but by sharing it on
                Alvacus, you grant Alvacus a non-exclusive, royalty-free,
                transferable, sub-licensable, worldwide license to use, store,
                display, reproduce, modify, and distribute your content on and
                through Alvacus.
              </li>
              <li>
                Prohibited content: You may not use Alvacus to create or share
                content that is illegal, infringes on the rights of others, or
                is offensive, harmful, or misleading. Alvacus reserves the right
                to remove any content that violates these terms or is otherwise
                objectionable.
              </li>
              <li>
                Disclaimer of warranties: Alvacus is provided &quot;as is&quot;
                and without warranty of any kind, either express or implied,
                including, but not limited to, the implied warranties of
                merchantability, fitness for a particular purpose, or
                non-infringement. Alvacus does not warrant that Alvacus will
                meet your requirements or be error-free or uninterrupted.
              </li>
              <li>
                Limitation of liability: Alvacus will not be liable to you for
                any damages arising from your use of Alvacus, including but not
                limited to, direct, indirect, incidental, punitive, and
                consequential damages.
              </li>
              <li>
                Indemnification: You agree to indemnify and hold Alvacus
                harmless from any claims, losses, damages, liabilities, and
                expenses (including reasonable attorneys&apos; fees) arising
                from your use of Alvacus or your violation of these terms.
              </li>
              <li>
                Modifications: Alvacus reserves the right to modify these terms
                of use at any time, without notice to you. Your continued use of
                Alvacus after such modifications will constitute your acceptance
                of the modified terms.
              </li>
              <li>
                Governing law: These terms of use shall be governed by and
                construed in accordance with the laws of Turkey, without giving
                effect to any principles of conflicts of law.
              </li>
              <li>
                Dispute resolution: Any dispute arising from or relating to
                these terms of use or your use of Alvacus shall be resolved
                through binding arbitration. The arbitration shall be held in
                Turkey, and the award may be enforced by any court of competent
                jurisdiction.
              </li>
            </ul>
            <p>
              If you have any questions or concerns about these terms of use,
              please
              <Link className='pl-1' href={`/contact`}>
                contact.
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Terms;

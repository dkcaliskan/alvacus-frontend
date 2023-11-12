// Api & Core imports
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

// Components
import Footer from '@/components/Navigation/Footer';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  alternates: {
    canonical: 'https://alvacus.com/privacy',
  },
};

const Privacy: NextPage = async () => {
  return (
    <>
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3'>
        <div className='prose max-w-none px-1.5 mt-3'>
          <h1 className='text-2xl lg:text-3xl'>Privacy policy</h1>
          <div>
            <h2>
              This privacy policy explains how Alvacus collects, uses, and
              protects the personal information that you provide when you use
              Alvacus.
            </h2>
            <ul className='list-decimal list-inside'>
              <li>
                Information We Collect: When you use Alvacus, we may collect the
                following types of personal information:
                <ol className='list-disc list-inside'>
                  <li>Username</li>
                  <li>Email address</li>
                  <li>IP address</li>
                  <li>
                    Usage data (such as the features you use and how you
                    interact with the app)
                  </li>
                  <li>Other information that you voluntarily provide to us</li>
                </ol>
              </li>
              <li>
                How We Use Your Information: We may use your personal
                information for the following purposes:
                <ol className='list-disc list-inside'>
                  <li>To provide and improve Alvacus</li>
                  <li>
                    To communicate with you about Alvacus and your account
                  </li>
                  <li>To personalize your experience with Alvacus</li>
                  <li>To enforce our terms of use and other policies</li>
                  <li>To comply with legal obligations</li>
                </ol>
              </li>
              <li>
                Sharing Your Information: We may share your personal information
                with the following third parties:
                <ol className='list-disc list-inside'>
                  <li>
                    Service providers who help us operate Alvacus and provide
                    you with our services
                  </li>
                  <li>
                    To communicate with you about Alvacus and your account
                  </li>
                  <li>
                    Other users of Alvacus, to the extent necessary to enable
                    your interactions with them
                  </li>
                  <li>
                    Law enforcement or other government agencies, in response to
                    a subpoena, court order, or other legal request
                  </li>
                </ol>
              </li>
              <li>
                Your Rights: You have the following rights with respect to your
                personal information:
                <ol className='list-disc list-inside'>
                  <li>
                    To access and review the personal information we have
                    collected about you
                  </li>
                  <li>
                    To request that we correct any inaccuracies in your personal
                    information
                  </li>
                  <li>To request that we delete your personal information</li>
                  <li>
                    To object to the processing of your personal information
                  </li>
                  <li>
                    To request that we provide you with a copy of your personal
                    information in a structured, commonly used, and
                    machine-readable format
                  </li>
                </ol>
              </li>
              <li>
                Security: We take reasonable measures to protect your personal
                information from unauthorized access, disclosure, or
                destruction. However, no method of transmission over the
                internet or electronic storage is completely secure, and we
                cannot guarantee absolute security.
              </li>
              <li>
                Children&apos;s Privacy: Alvacus is not intended for use by
                children under the age of 13, and we do not knowingly collect
                personal information from children under 13.
              </li>
              <li>
                Changes to this Privacy Policy: We may update this privacy
                policy from time to time by posting a new version on our
                website. Your continued use of Alvacus after any changes to this
                policy will constitute your acceptance of the changes.
              </li>
              <li>
                Contact: If you have any questions or concerns about this
                privacy policy or our practices with respect to your personal
                information, please
                <Link className='pl-1' href={`/contact`}>
                  contact.
                </Link>
              </li>
            </ul>
          </div>
          <p>
            This privacy policy as of {new Date().toLocaleDateString('en-GB')}{' '}
            and was last updated on 03/04/2023.
          </p>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Privacy;

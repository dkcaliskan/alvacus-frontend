// Api & Core imports
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

// Components
import Footer from '@/components/Navigation/Footer';

// Metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  alternates: {
    canonical: 'https://alvacus.com/about',
  },
};

const About: NextPage = async () => {
  return (
    <>
      <section className='container mx-auto lg:my-3 lg:px-3 font-main pb-3'>
        <div className='prose max-w-none px-1.5 mt-3'>
          <h1 className='text-2xl lg:text-3xl'>
            Welcome to <span className='text-warning'>Alvacus</span>!
          </h1>
          <div>
            <h2 className='text-xl lg:text-2xl'>
              I&apos;m excited to introduce you to it.
            </h2>
            <p>
              As someone who has always been fascinated by calculators, I wanted
              to create an application that would allow anyone to easily create
              their custom calculators. With Alvacus, you can do precisely that.
              By using a formula, you can create a calculator that suits your
              needs and save it for future use.
            </p>
            <p>
              However, the app is not only about creating your own calculators.
              You can also browse a collection of calculators that have been
              created by other users and save the ones that you find useful.
            </p>
            <p>
              The app is designed to be user-friendly and intuitive, even for
              those who are not particularly tech-savvy. You don&apos;t need any
              programming knowledge to create your own custom calculator; just
              enter the formula and the app will take care of the rest. And with
              the ability to save and share your calculators, you can
              collaborate with others and build upon each other&apos;s work.
              Moreover, you can leave comments to help others who might be using
              the same calculator.
            </p>

            <p>
              My vision for Alvacus is to create a community of users who are
              passionate about numbers and who want to share their knowledge and
              expertise with others. Whether you&apos;re a math whiz, a student,
              a scientist, an engineer, or just someone who loves playing with
              numbers, I hope you&apos;ll find something of value in this app.
            </p>
            <p>
              Thank you for taking the time to learn more about Alvacus. If you
              have any questions, comments, or feedback, please don&apos;t
              hesitate to
              <Link className='mx-1' href={`/contact`}>
                contact
              </Link>
              me. I&apos;m always looking for ways to improve the app, and
              I&apos;d love to hear from you!
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

export default About;

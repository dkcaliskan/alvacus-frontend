// Api & Core imports
import React, { FunctionComponent } from 'react';
import Link from 'next/link';

const CreateHowItWorks: FunctionComponent = () => {
  return (
    <div className='custom-bg-color p-3 pb-6  rounded-lg lg:rounded-box mt-3 '>
      <h2 className='text-2xl lg:text-3xl  font-semibold lgMax:text-center'>
        How it works
      </h2>
      <div className='prose max-w-none mt-3'>
        <p>
          Welcome to Alvacus&apos;s &quot;Create Your Own Calculator&quot;
          feature! With this handy tool, you can create your very own calculator
          by entering a mathematical formula. It&apos;s pretty simple - just mix
          and match math operations to create the calculator you need.
        </p>
        <p>
          To get started, all you need to do is enter your formula, give each
          variable a label, add a title, select a category, write a brief
          description of your formula, and provide any additional information
          you&apos;d like users to know. And if you require more complex usage,
          you can refer to the documentation or examples provided below the
          &quot;How it works&quot; section.
        </p>
        <p>
          If you need to convert between units in your formula, no problem. Just
          check the box in the &apos;Create Calculator&apos; section, select the
          base unit for your variable, and choose the units you wish to convert.
          Then, with one click of the &quot;Submit&quot; button, your calculator
          is ready to go!
        </p>

        <p>
          So go ahead and give it a try. There are endless possibilities when it
          comes to creating your own calculator with Alvacus. And if you run
          into any issues, don&quot;t worry. Just
          <Link href={`/contact`} className=' px-1 link'>
            Contact
          </Link>
          and i&quot;ll be happy to assist you.
        </p>
        <p>
          **The calculator will be in a pending status until it is approved and
          will not appear on the homepage. However, you can still edit and share
          it, and other users can use it. The approval process is in place to
          ensure that the calculator is not spammy or inappropriate. This
          process may take up to 24 hours.
        </p>
      </div>
    </div>
  );
};

export default CreateHowItWorks;

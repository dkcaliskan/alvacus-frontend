'use client';
// Api & Core imports
import React, { FunctionComponent, useState } from 'react';

const CreateDocumentation: FunctionComponent = () => {
  const [showDocumentation, setShowDocumentation] = useState(false);

  return (
    <div
      className={`custom-bg-color p-3 rounded-lg lg:rounded-box mt-3 relative`}
    >
      <h2 className='text-2xl lg:text-3xl  font-semibold lgMax:text-center'>
        Documentation
      </h2>
      <div
        className={`prose max-w-none my-3 overflow-hidden ${
          !showDocumentation ? 'max-h-[390px] line-clamp-6' : ''
        }`}
      >
        <ol className='list-disc'>
          <li>
            <strong>π = pi</strong>:
            <span className='pl-1'>
              This is the mathematical constant π, which represents the ratio of
              a circle&apos;s circumference to its diameter. It is approximately
              equal to 3.14159.
            </span>
          </li>
          <li>
            <strong>x^y</strong>:
            <span className='pl-1'>
              This is the exponent operator. It returns the value of x raised to
              the power of y.
            </span>
          </li>
          <li>
            <strong>e</strong>:
            <span className='pl-1'>
              This is the mathematical constant e, which represents the base of
              the natural logarithm. It is approximately equal to 2.71828.
            </span>
          </li>
          <li>
            <strong>√x = sqrt(x)</strong>:
            <span className='pl-1'>
              This function returns the square root of x.
            </span>
          </li>
          <li>
            <strong>log(x)</strong>:
            <span className='pl-1'>
              This function returns the natural logarithm (base e) of x.
            </span>
          </li>
          <li>
            <strong>log10(x)</strong>:
            <span className='pl-1'>
              This function returns the base-10 logarithm of x.
            </span>
          </li>
          <li>
            <strong>abs(x)</strong>:
            <span className='pl-1'>
              This function returns the absolute value of x.
            </span>
          </li>
          <li>
            <strong>sin(x)</strong>:
            <span className='pl-1'>
              This function returns the sine of x, where x is in radians.
            </span>
          </li>
          <li>
            <strong>cos(x)</strong>:
            <span className='pl-1'>
              This function returns the cosine of x, where x is in radians.
            </span>
          </li>
          <li>
            <strong>tan(x)</strong>:
            <span className='pl-1'>
              This function returns the tangent of x, where x is in radians.
            </span>
          </li>
          <li>
            <strong>sin⁻¹(x) = asin(x)</strong>:
            <span className='pl-1'>
              This function returns the inverse sine (also known as arcsine) of
              x, in radians.
            </span>
          </li>
          <li>
            <strong>cos⁻¹(x) = acos(x)</strong>:
            <span className='pl-1'>
              This function returns the inverse cosine (also known as arccosine)
              of x, in radians.
            </span>
          </li>
          <li>
            <strong>tan⁻¹(x) = atan(x)</strong>:
            <span className='pl-1'>
              This function returns the inverse tangent (also known as
              arctangent) of x, in radians.
            </span>
          </li>
          <li>
            <strong>sinh(x)</strong>:
            <span className='pl-1'>
              This function returns the hyperbolic sine of x.
            </span>
          </li>
          <li>
            <strong>cosh(x)</strong>:
            <span className='pl-1'>
              This function returns the hyperbolic cosine of x.
            </span>
          </li>
          <li>
            <strong>tanh(x)</strong>:
            <span className='pl-1'>
              This function returns the hyperbolic tangent of x.
            </span>
          </li>
          <li>
            <strong>sinh⁻¹(x) = asinh(x)</strong>:
            <span className='pl-1'>
              This function returns the inverse hyperbolic sine of x.
            </span>
          </li>
          <li>
            <strong>cosh⁻¹(x) = acosh(x)</strong>:
            <span className='pl-1'>
              This function returns the inverse hyperbolic cosine of x.
            </span>
          </li>
          <li>
            <strong>tanh⁻¹(x) = atanh(x)</strong>:
            <span className='pl-1'>
              This function returns the inverse hyperbolic tangent of x.
            </span>
          </li>
          <li>
            <strong>ceil(x)</strong>:
            <span className='pl-1'>
              This function returns the smallest integer greater than or equal
              to x.
            </span>
          </li>
          <li>
            <strong>floor(x)</strong>:
            <span className='pl-1'>
              This function returns the largest integer less than or equal to x.
            </span>
          </li>
          <li>
            <strong>round(x)</strong>:
            <span className='pl-1'>
              This function returns the value of x rounded to the nearest
              integer.
            </span>
          </li>
          <li>
            <strong>pow(x, y)</strong>:
            <span className='pl-1'>
              This function returns the value of x to the power of y.
            </span>
          </li>
        </ol>
      </div>
      <button
        className='text-blue-500 btn btn-ghost btn-sm w-full text-center '
        onClick={() => setShowDocumentation(!showDocumentation)}
      >
        {!showDocumentation ? 'Show More' : 'Show Less'}
      </button>
    </div>
  );
};

export default CreateDocumentation;

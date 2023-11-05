// Api & Core imports
import React, { FunctionComponent } from 'react';

const CreateExamples: FunctionComponent = () => {
  return (
    <div className="custom-bg-color p-3 pb-6  rounded-lg lg:rounded-box mt-3 ">
      <h2 className=" text-2xl lg:text-3xl  font-semibold lgMax:text-center">
        Examples
      </h2>
      <div className="prose max-w-none mt-3">
        <ol className="list-disc">
          <li>
            <strong>The Pythagorean Theorem:</strong>
            <span className="pl-1 italic">a² + b² = c² can be written as</span>
            <strong className="pl-1">sqrt(square(a) + square(b))</strong>
          </li>
          <li>
            <strong>The formula for the surface area of a sphere:</strong>
            <span className="pl-1 italic">4πr² can be written as</span>
            <strong className="pl-1">4 * pi * square(r)</strong>
          </li>
          <li>
            <strong>Area of a circle:</strong>
            <span className="pl-1 italic">πr² can be written as</span>
            <strong className="pl-1">pi * square(r)</strong>
          </li>
          {/* <li>
            <strong>The Quadratic Formula:</strong>
            <span className="italic pl-1">
              &minus;b ± √b²-4ac/2a can be written as
            </span>
            <strong className="pl-1 ">
              (&minus;b + sqrt(square(b) - 4 * a * c)) / (2 * a)
            </strong>
          </li>
          <li>
            <strong>Distance Formula:</strong>
            <span className="italic pl-1">
              √(x₁ &minus; x₂)² + (y₁ &minus; y₂)² can be written as
            </span>
            <strong className="pl-1 ">
              sqrt(square(x - z) + square(y - w))
            </strong>
          </li>
          <li>
            <strong>Slope Formula:</strong>
            <span className="italic pl-1">
              y₂ &minus; y₁ / x₂ &minus; x₁ can be written as
            </span>
            <strong className="pl-1 ">(x - z) / (y - w)</strong>
          </li>
          <li>
            <strong>Midpoint Formula:</strong>
            <span className="italic pl-1">
              (x₁+x₂) / 2, (y₁+y₂) / 2 can be written as
            </span>
            <strong className="pl-1 ">(x + z) / 2, (y + w) / 2</strong>
          </li> */}
          <li>
            <strong>The formula for the volume of a cylinder:</strong>
            <span className="italic pl-1">πr²h can be written as</span>
            <strong className="pl-1">pi * square(r) * h</strong>
          </li>
          <li>
            <strong>The equation for the area of a triangle:</strong>
            <span className="italic pl-1">1/2bh can be written as</span>
            <strong className="pl-1">0.5 * b * h</strong>
          </li>
          <li>
            <strong>The equation for converting Celsius to Fahrenheit:</strong>
            <span className="italic pl-1">
              (°C &times; 9/5) + 32 can be written as
            </span>
            <strong className="pl-1">(a * 1.8) + 32</strong>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default CreateExamples;

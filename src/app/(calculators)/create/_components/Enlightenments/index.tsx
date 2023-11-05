// Api & Core imports
import React, { FunctionComponent } from 'react';

// Components
import CreateHowItWorks from './HowItWorks';
import CreateExamples from './Examples';
import CreateDocumentation from './Documentation';

const CreateEnlightenment: FunctionComponent = () => {
  return (
    <div>
      <div>
        <CreateHowItWorks />
      </div>
      <div>
        <CreateDocumentation />
      </div>
      <div>
        <CreateExamples />
      </div>
    </div>
  );
};

export default CreateEnlightenment;

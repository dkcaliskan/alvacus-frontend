const CalculatorCardSkeleton = () => {
  return (
    <div className='rounded-box custom-bg-color lgMax:rounded-md min-h-[180px] max-h-[180px] z-10 animate-pulse'>
      <div className='card-body px-0 py-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center lgMax:pl-1.5 pl-3 pt-[8.5px]'>
            <div className='mask mask-squircle bg-base-content h-[45px] w-[45px] bg-opacity-[0.01]'></div>

            <div>
              <div className='ml-1.5 bg-base-100 w-[100px] h-[10px] rounded-lg'></div>
              <div className='ml-1.5 bg-base-100 w-[50px] h-[10px] rounded-lg mt-1'></div>
            </div>
          </div>
        </div>
        <div className=' lgMax:px-1.5 px-3 '>
          <div className='flex items-center bg-base-100 w-[350px] h-[10px] rounded-lg'></div>
          <div className='mb-3 mt-5 bg-base-100 w-full h-[10px] rounded-lg'></div>
          <div className='mb-6 mt-1.5 bg-base-100 w-full h-[10px] rounded-lg'></div>
          <div className='flex items-center'>
            <div className='flex items-center bg-base-100 w-[50px] h-[10px] rounded-lg'></div>
            <div className='ml-1 flex items-center bg-base-100 w-[50px] h-[10px] rounded-lg'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCardSkeleton;

const ListSelectSkeleton = () => {
  return (
    <div>
      <div className='flex items-center -mb-[2px] gap-0.5 animate-pulse'>
        <div className='w-[85px] h-[43px] custom-bg-color  rounded-tr-xl  lg:rounded-t-xl'></div>
        <div className='w-[60px] h-[43px] custom-bg-color  rounded-t-xl'></div>
        <div className='w-[60px] h-[43px] custom-bg-color  rounded-t-xl'></div>
      </div>
    </div>
  );
};

export default ListSelectSkeleton;

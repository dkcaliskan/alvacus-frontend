'use client';

// Api & Core imports
import { FunctionComponent, useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Icons & Ui
import { BsPencilFill } from 'react-icons/bs';

// Components
import Avatar from '../UiElements/Avatar';
import ProfileDropdown from './ProfileDropdown';
import SavedCalculators from './SavedCalculators';
import MyCalculators from './MyCalculators';
import ProfileSideSkeleton from '../UiElements/Skeletons/ProfileSideSkeleton';

// Contexts & Hooks
import { AuthContext } from '@/context/authContext';
import useUser from '@/hooks/auth/useUser';

// Constants
import { LOGO_ICON } from '@/constants/ImageConstants';

// Types
type ProfileSideType = {
  setIsProfileDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileSidebar: FunctionComponent<ProfileSideType> = ({
  setIsProfileDrawerOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Get tag and page from url
  const tag = params.get('tag');
  const page = params.get('page');

  // Auth context
  const auth = useContext(AuthContext);

  // User context
  const { user, error, mutate, isLoading } = useUser();

  // Logout handler
  const handleLogout = async () => {
    const updateParams = new URLSearchParams(params.toString());

    // Get logout response from server
    const logoutResponse: {
      success?: boolean;
      error?: string;
    } = await auth.logout!();

    // If logout response is not successful, return
    if (!logoutResponse.success) {
      return;
    }

    // After logout, if user is on protected tag, redirect to public tag
    if (tag !== 'all') {
      updateParams.set('tag', 'all');
    }
    if (page !== '1') {
      updateParams.set('page', '1');
    }

    // Update url
    router.push(pathname + '?' + updateParams.toString());

    // Update user data
    mutate(null);
  };

  // If user is not logged in and loading, show loader
  if (isLoading && !user) {
    return (
      <div className='w-full mt-[8.2px]'>
        <ProfileSideSkeleton />
      </div>
    );
  }

  // If user is not logged in, show login
  if (!user || error) {
    return (
      <div className='w-full mt-[8.2px]'>
        <div className='flex items-center mb-1.5 '>
          <Image
            src={LOGO_ICON}
            width={35}
            height={35}
            alt='logo'
            title='Alvacus, logo'
          />
          <span className='label-text pl-2 text-xl'>Welcome back!</span>
        </div>

        <div className='mt-2'>
          <Link
            href='/login'
            as={`/login`}
            className='btn min-h-[45px] h-[45px] max-h-[45px] btn-primary rounded-full w-full'
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  // If user is logged in, show profile
  return (
    <div className='w-full mt-[8.2px] lgMax:max-w-[500px] lgMax:mx-auto'>
      <div className='lgMax:profile-drawer-overflow lgMax:overflow-x-auto'>
        <div className='flex items-center mb-1.5 '>
          <Image
            src={LOGO_ICON}
            width={35}
            height={35}
            alt='logo'
            title='Alvacus, logo'
          />
          <h3 className='label-text pl-2 text-xl'>Profile</h3>
        </div>
        <div className='custom-bg-color rounded-box p-3 mt-[8.7px]'>
          <div className='grid justify-items-center pt-[2px]'>
            <div className='avatar  relative'>
              <Link
                href={`/profile/settings/account`}
                className='bg-base-200/80 btn-ghost p-2 rounded-full absolute right-0 bottom-0 z-10  '
              >
                <BsPencilFill className='text-[#3b82f6]' size={18} />
              </Link>

              <Avatar width={256} height={256} />
            </div>
          </div>
          <div>
            <ProfileDropdown username={user.username} logout={handleLogout} />
          </div>
        </div>
        <div className='mt-3'>
          <SavedCalculators
            userId={user.userId}
            setIsProfileDrawerOpen={setIsProfileDrawerOpen}
          />
        </div>
        <div className='mt-3'>
          <MyCalculators
            userId={user.userId}
            setIsProfileDrawerOpen={setIsProfileDrawerOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

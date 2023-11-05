// Api & Core imports
import React, { Suspense } from 'react';
import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

// Components
import UserInfo from './_components/UserInfo';
import UserCalculators from './_components/UserCalculators';

// Server Actions
import getUserProfile from '@/server-actions/getUser';

// Constants
import { DESCRIPTION } from '@/constants/AppConstants';

// Types
import type { UserTypes } from '@/types/user.d';
type ProfilePageTypes = {
  params: {
    id: string;
  };
};

// Metadata
export async function generateMetadata({
  params,
}: ProfilePageTypes): Promise<Metadata> {
  const userData: Promise<UserTypes> = getUserProfile({
    userId: params.id,
  });
  const user = await userData;

  if (!user) {
    return {
      title: 'User not found',
    };
  }

  return {
    title:
      user.username.charAt(0).toUpperCase() +
      user.username.slice(1) +
      ' profile',
    openGraph: {
      title:
        user.username.charAt(0).toUpperCase() +
        user.username.slice(1) +
        ' profile' +
        ' | Alvacus',
      description: DESCRIPTION,
      images: [
        {
          url: user.avatar
            ? user.avatar
            : 'https://Alvacus.com/assets/icons/core/android-chrome-512x512.png',
          width: 800,
          height: 600,
          alt: user.username + ' avatar',
          type: 'image/png',
        },
      ],
    },
    alternates: {
      canonical: 'https://alvacus.com/' + user._id,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alvacus',
      title: user.username + ' profile' + ' | Alvacus',
      description: DESCRIPTION,
      images: [
        'https://alvacus.com/assets/icons/core/android-chrome-512x512.png',
      ],
    },
  };
}

const Profile: NextPage<ProfilePageTypes> = async ({ params }) => {
  // Get user data
  const userData: Promise<UserTypes> = getUserProfile({
    userId: params.id,
  });

  const user = await userData;

  // If user is not found, redirect to 404 page
  if (!user) {
    notFound();
  }

  return (
    <div>
      <div>
        <UserInfo user={user} />
        <UserCalculators user={user} />
      </div>
    </div>
  );
};

export default Profile;

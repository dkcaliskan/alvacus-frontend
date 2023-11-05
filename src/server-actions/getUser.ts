// Constants
import { BACKEND_URL } from '@/constants/AppConstants';

// Types
type getUserProfileTypes = {
  userId: string;
};

const getUserProfile = async ({ userId }: getUserProfileTypes) => {
  const res = await fetch(`${BACKEND_URL}/api/user/${userId}`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    return undefined;
  }
  return res.json();
};

export default getUserProfile;

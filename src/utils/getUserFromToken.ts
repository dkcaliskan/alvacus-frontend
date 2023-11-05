// Api & Core imports
import { jwtDecode } from 'jwt-decode';

// Types
import { GetUserFromTokenType } from '@/types/user.d';

function getUserFromToken(accessToken: string) {
  try {
    // Decode the token
    const decodedToken = jwtDecode<{
      exp: number;
      UserInfo: GetUserFromTokenType;
    }>(accessToken);

    // Return the user info
    return decodedToken.UserInfo;
  } catch (error) {
    return null;
  }
}

export { getUserFromToken };

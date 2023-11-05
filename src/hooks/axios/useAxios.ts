// Api & Core imports
import axios from 'axios';

// Constants
import { BACKEND_URL } from '@/constants/AppConstants';

export default axios.create({
  baseURL: BACKEND_URL,
});

import ENV from '@/config/env';
import axios from 'axios';

export default axios.create({
  baseURL: ENV.API_URL,
});

export { axios };

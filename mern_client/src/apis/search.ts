import axios from 'axios';
import { Info } from '../types/info';

export const getInfoListBySearchKeyword = (keyword: string) =>
  axios.get<{ message: string; data: Info[] }>(
    `/api/search?keyword=${keyword}`
  );

import axios from 'axios';
import { Info } from '../types/info';

export const getInfoList = () =>
  axios.get<{ message: string; data: Info[] }>('/api/info');

export const createInfo = (info: Info) =>
  axios.post<Info, { message: string }>('/api/info', info);

export const deleteInfo = (id: Info['id']) =>
  axios.delete<Info, { message: string; data: Info[] }>(`/api/info/${id}`);

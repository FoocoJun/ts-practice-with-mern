import { HttpException } from '../middlewares/errorHandler';
import InfoModel from '../model/info';
import { HttpCode } from '../types/httpCode';
import { Info } from '../types/info';

export default {
  createInfo: async (info: Info) => {
    try {
      const result = await InfoModel.create(info);
      return result;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },

  getInfo: async (id: Info['id']) => {
    try {
      const result = await InfoModel.findOne({ id });
      return result;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },

  getInfoList: async () => {
    try {
      const result = await InfoModel.find({}, { _id: 0, __v: 0 });
      return result;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },

  deleteInfo: async (id: Info['id']) => {
    try {
      await InfoModel.findOneAndRemove({ id });
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },
};

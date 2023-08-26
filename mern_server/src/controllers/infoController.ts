import { NextFunction, Request, Response } from 'express';
import { Info } from '../types/info';
import infoService from '../services/infoService';
import { HttpException } from '../middlewares/errorHandler';
import { HttpCode } from '../types/httpCode';

export default {
  createInfo: async (req: Request, res: Response, next: NextFunction) => {
    const info = req.body as Info;

    try {
      const target = await infoService.getInfo(info.id);
      if (target) throw new HttpException(HttpCode.CONFLICT, '중복된 데이터');

      await infoService.createInfo(info);
      res.status(HttpCode.OK).json({
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  },

  getInfoList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await infoService.getInfoList();
      res.status(HttpCode.OK).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteInfo: async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      const target = await infoService.getInfo(id);
      if (!target) throw new HttpException(HttpCode.NOT_FOUND, 'NOT FOUND 404');

      await infoService.deleteInfo(id);

      const data = await infoService.getInfoList();
      res.status(HttpCode.OK).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

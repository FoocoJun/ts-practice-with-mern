import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../middlewares/errorHandler';
import { HttpCode } from '../types/httpCode';
import searchService from '../services/searchService';

export default {
  searchKeyword: async (req: Request, res: Response, next: NextFunction) => {
    const keyword = req.query.keyword as string;

    try {
      const data = await searchService.getInfoListByKeyword(keyword);
      res.status(HttpCode.OK).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

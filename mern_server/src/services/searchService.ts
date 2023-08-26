import axios from 'axios';
import { HttpCode } from '../types/httpCode';
import { HttpException } from '../middlewares/errorHandler';
import { SearchResponse } from '../types/search';

export default {
  getInfoListByKeyword: async (keyword: string) => {
    try {
      const result = await axios.get<SearchResponse>(
        encodeURI(`https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}`),
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
          },
        }
      );

      const infoList = result.data.documents.map((item) => ({
        id: Number(item.id),
        placeName: item.place_name,
        addressName: item.address_name,
        position: {
          lat: Number(item.y),
          lng: Number(item.x),
        },
      }));

      return infoList;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, '카카오 서버 에러');
    }
  },
};

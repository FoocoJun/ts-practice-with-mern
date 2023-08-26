import express from 'express';
import infoController from '../controllers/infoController';
import searchController from '../controllers/searchController';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'health check!!',
  });
});

// 위치 데이터 저장
router.post('/info', infoController.createInfo);

// 전체 위치 데이터 조회
router.get('/info', infoController.getInfoList);

// 전체 위치 데이터 조회
router.delete('/info', infoController.deleteInfo);

// 키워드 검색
router.get('/search', searchController.searchKeyword);

export default router;

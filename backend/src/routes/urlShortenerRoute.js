import { Router } from 'express';

import urlShortenerController from '../controllers/urlShortenerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();


// router.use(protectRoute)
router.post('/', urlShortenerController.createUrl);
router.post('/create-custom-url', urlShortenerController.createUrl);


export default router;  
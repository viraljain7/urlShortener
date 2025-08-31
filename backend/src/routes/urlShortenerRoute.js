import { Router } from 'express';
import { nanoid } from "nanoid";
import urlShortenerController from '../controllers/urlShortenerController.js';
const router = Router();


// router.use(protectRoute)

router.post('/', urlShortenerController.createUrl);

export default router;  
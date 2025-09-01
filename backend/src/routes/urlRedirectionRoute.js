import { Router } from 'express';
import urlRedirectionController from '../controllers/urlRedirectionController.js';
 
const router = Router();


// router.use(protectRoute)
router.get('/:id', urlRedirectionController);


export default router;  
import express from 'express';
import ShortnerController from '../controllers/index.js';
import Validation from '../validation/index.js';

const router = express.Router();
const shortnerController = new ShortnerController();
const validate = new Validation();

router.post('/shorten', validate.validateShorten,  shortnerController.shorten)
router.get('/stats', validate.validateStats, shortnerController.stats)
router.get('/:slug', validate.validateParams, shortnerController.redirect)

export default router;
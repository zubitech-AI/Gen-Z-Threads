const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/tryonController');

router.post('/save-snapshot', auth, ctrl.saveSnapshot);
router.get('/history', auth, ctrl.getHistory);

module.exports = router;

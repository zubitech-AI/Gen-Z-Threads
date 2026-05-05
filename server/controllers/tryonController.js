const TryOnSession = require('../models/TryOnSession');

// POST /api/tryon/save-snapshot
exports.saveSnapshot = async (req, res) => {
  try {
    const { product_id, snapshot_url } = req.body;
    if (!product_id || !snapshot_url) {
      return res.status(400).json({ message: 'Product ID and snapshot are required.' });
    }
    const session = await TryOnSession.create({
      user_id: req.user._id, product_id, snapshot_url
    });
    res.status(201).json({ message: 'Snapshot saved.', session });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// GET /api/tryon/history
exports.getHistory = async (req, res) => {
  try {
    const sessions = await TryOnSession.find({ user_id: req.user._id })
      .populate('product_id', 'name image_url')
      .sort({ created_at: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

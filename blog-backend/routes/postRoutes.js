const express = require('express');
const router = express.Router();
const {
  createPost,
  upload,
  getAllPosts,
  toggleLike,
  addComment,
  editPost,
  deletePost,
  getPostById,
  getPostsByUser,
  getPostsByCategory,
  deleteComment
} = require('../controllers/postController');

const {
  changePassword,
  uploadProfilePic,
  getUserProfile,
  getUserStats
} = require('../controllers/authController'); // 🔄 UPDATED THIS LINE

const authMiddleware = require('../middleware/authMiddleware');

// 📝 Post Routes
router.post('/', authMiddleware, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/user/:userId', getPostsByUser);
router.get('/category/:category', getPostsByCategory);
router.get('/:id', getPostById);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id/like', authMiddleware, toggleLike);
router.put('/:id', authMiddleware, upload.single('image'), editPost);

// 💬 Comment Routes
router.post('/:id/comment', authMiddleware, addComment);
router.delete('/:postId/comment/:commentId', authMiddleware, deleteComment);

// 👤 User Routes
router.put('/change-password', authMiddleware, changePassword);
router.put('/profile-picture', authMiddleware, upload.single('profilePic'), uploadProfilePic);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/stats', authMiddleware, getUserStats);

module.exports = router;

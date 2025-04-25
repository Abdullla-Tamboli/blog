const express = require('express');
const router = express.Router();
const { createPost, upload, getAllPosts, toggleLike, addComment, editPost, deletePost, getPostById, getPostsByUser, getPostsByCategory } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', getPostsByUser);
router.get('/category/:category', getPostsByCategory);
// router.put('/:id', authMiddleware, editPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id/like', authMiddleware, toggleLike);
router.put('/:id', authMiddleware, upload.single('image'), editPost);

router.post('/:id/comment', authMiddleware, addComment);

module.exports = router;

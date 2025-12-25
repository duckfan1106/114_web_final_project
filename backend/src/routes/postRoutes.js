const express = require('express');
const { createPost, getPosts, getPost, updatePost, deletePost, likePost, commentPost } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:id')
    .get(getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);
router.route('/:id/comment').post(protect, commentPost);

module.exports = router;

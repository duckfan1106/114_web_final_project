const postService = require('../services/postService');

exports.createPost = async (req, res) => {
    try {
        const { text, image } = req.body;
        const post = await postService.createPost(req.user._id, text, image);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { text, image } = req.body;
        const post = await postService.updatePost(req.user._id, req.params.id, text, image);
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await postService.deletePost(req.user._id, req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await postService.toggleLike(req.user._id, req.params.id);
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.commentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const comment = await postService.addComment(req.user._id, req.params.id, text);
        res.status(201).json({ success: true, data: comment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

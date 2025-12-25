const Post = require('../models/Post');
const Comment = require('../models/Comment');

class PostRepository {
    async createPost(postData) {
        return await Post.create(postData);
    }

    async findAllPosts() {
        return await Post.find().sort({ createdAt: -1 })
            .populate('user', 'username email')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'username' }
            });
    }

    async findPostById(id) {
        return await Post.findById(id)
            .populate('user', 'username email')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'username' }
            });
    }

    async updatePost(id, updateData) {
        return await Post.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deletePost(id) {
        return await Post.findByIdAndDelete(id);
    }

    async addComment(commentData) {
        const comment = await Comment.create(commentData);
        await Post.findByIdAndUpdate(commentData.post, {
            $push: { comments: comment._id }
        });
        return comment;
    }

    async toggleLike(postId, userId) {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        // Check if user already liked
        // Note: likes is an array of ObjectIds. 
        // Mongoose array includes method might need string comparison or casting.
        const isLiked = post.likes.some(id => id.toString() === userId.toString());

        if (isLiked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        return post;
    }
}

module.exports = new PostRepository();

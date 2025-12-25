const postRepository = require('../repositories/postRepository');

class PostService {
    async createPost(userId, text, image) {
        return await postRepository.createPost({ user: userId, text, image });
    }

    async getAllPosts() {
        return await postRepository.findAllPosts();
    }

    async getPostById(id) {
        const post = await postRepository.findPostById(id);
        if (!post) throw new Error('Post not found');
        return post;
    }

    async updatePost(userId, postId, text, image) {
        const post = await postRepository.findPostById(postId);
        if (!post) throw new Error('Post not found');

        // Check ownership
        if (post.user._id.toString() !== userId.toString()) {
            throw new Error('Not authorized to update this post');
        }

        const updateData = { text };
        if (image) updateData.image = image;

        return await postRepository.updatePost(postId, updateData);
    }

    async deletePost(userId, postId) {
        const post = await postRepository.findPostById(postId);
        if (!post) throw new Error('Post not found');

        if (post.user._id.toString() !== userId.toString()) {
            throw new Error('Not authorized to delete this post');
        }

        return await postRepository.deletePost(postId);
    }

    async toggleLike(userId, postId) {
        return await postRepository.toggleLike(postId, userId);
    }

    async addComment(userId, postId, text) {
        const post = await postRepository.findPostById(postId);
        if (!post) throw new Error('Post not found');

        return await postRepository.addComment({ user: userId, post: postId, text });
    }
}

module.exports = new PostService();

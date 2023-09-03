const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new post route
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update post route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Post.findByPk(postId);
        if(!updatedPost) {
            res.status(404).json({ message: 'Cannot find post' });
        }
        await Post.update(req.body, {
            where: {
                id: postId,
            }
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete post route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.destroy({
            where: {
                id: postId
            }
        });
        if (!deletedPost) {
            res.status(404).json({ message: 'Cannot find post' });
        };
        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
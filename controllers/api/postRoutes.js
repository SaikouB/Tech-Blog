const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all post route

router.get('/', async (req, res) => {
    try {
        const allPost = await Post.findAll(req.body);
        res.status(200).json(allPost)
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create new post route
router.post('/', async (req, res) => {
    try {
        const userId = req.session.user_id
        const newPost = await Post.create({  
            title: req.body.title,
            post_text: req.body.post_text,
            post_date: req.body.post_date,
            user_id: userId
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update post route
router.put('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Post.findByPk(postId);
        if (!updatedPost) {
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
router.delete('/:id', async (req, res) => {
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
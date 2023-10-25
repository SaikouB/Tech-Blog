const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        if (!comments) {
            res.status(404).json('No comments yet!')
        } else {
            res.status(200).json(comments);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!comment) {
            res.status(404).json('Cannot find comment')
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create Comment route
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update comment route
router.put('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const updatedComment = await Comment.findByPk(commentId);
        if (!updatedComment) {
            res.status(404).json({ message: 'Cannot find comment' });
        }
        await Comment.update(req.body, {
            where: {
                id: commentId,
            }
        });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete comment route
router.delete('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await Comment.destroy({
            where: {
                id: commentId,
            }
        });
        if (!deletedComment) {
            res.status(404).json({ message: 'Cannot find comment' });
        };
        res.status(200).json(deletedComment)
    } catch {
        res.status(500).json(error)
    }
});

module.exports = router;

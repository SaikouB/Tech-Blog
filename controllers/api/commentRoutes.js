const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create Comment route
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update comment route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentId = req.params.id;
        const updatedComment = await Comment.findByPk(commentId);
        if(!updatedComment) {
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
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await Comment.destroy({
            where: {
                id: commentId,
            }
        });
        if(!deletedComment) {
            res.status(404).json({ message: 'Cannot find comment' });
        };
        res.status(200).json(deletedComment)
    } catch {
        res.status(500).json(error)
    }
});

module.exports = router;

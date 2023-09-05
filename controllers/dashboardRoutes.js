const path = require('path');
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for dashboard
router.get('/dashboard', async (req, res) => {
	try {
		const postData = await Post.findAll({
			attributes: ['id', 'title', 'post_text', 'post_date'],
			include: [
				{
					model: Comment,
					attributes: ['id', 'comment_text', 'post_id', 'user_id']
				},
				{
					model: User,
					attributes: ['username']
				}
			]
		});
		if (!postData) {
			res.render('error', { message: 'Cannot get posts' });
		} else {
			res.render('dashboard', postData);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
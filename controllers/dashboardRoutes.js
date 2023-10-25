const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for dashboard
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id
			},
			attributes: ['id', 'title', 'post_text', 'post_date'],
			include: [
				{
					model: Comment,
					attributes: ['id', 'comment_text', 'post_id', 'user_id'],
					include: {
						model: User,
						attributes: ['username']
					}
				},
				{
					model: User,
					attributes: ['username']
				}
			]
		});
		if (!postData) {
			res.send({ message: 'Cannot get posts' });
		} else {
			res.render('dashboard');
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/modify/:id', async (req, res) => {
	try {
		const modifyPost = await Post.findOne({
			where: {
				id: req.params.id
			},
			attributes: ['id', 'title', 'post_text', 'post_date'],
			include: [
				{
					model: User,
					attributes: ['username']
				},
				{
					model: Comment,
					attributes: ['id', 'comment_text', 'post_id', 'user_id'],
					include: {
						model: User,
						attributes: ['username']
					}
				}
			]
		});
		if (!modifyPost) {
			res.send({ message: 'Cannot get post' });
		} else {
			const post = modifyPost.get({ plain: true })
			res.render('modifyDelete',  {post, loggedIn: true});
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/post', (req, res) => {
	res.render('createPost')
});

module.exports = router;
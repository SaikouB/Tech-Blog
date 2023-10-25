const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection')


router.get('/', async (req, res) => {
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
			res.send({ message: 'Cannot get posts' });
		} else {
			res.render('dashboard');
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

// Log in route
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	} else {
		res.render('login');
	}
});

router.get('/dashboard', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	} else {
		res.render('dashboard');
	}
});

module.exports = router;
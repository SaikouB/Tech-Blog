const router = require('express').Router();
const { User } = require('../../models');

// Create new user route
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        // identifies logged in user and sets loggedIn to true
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.status(200).json(newUser);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorret email or password, please try again' });
        }
        const userInfo = user.get({ plain: true })
        req.session.save(() => {
            req.session.user_id = userInfo.id;
            req.session.username = userInfo.username;
            req.session.loggedIn = true;

            res.status(200).json({ userInfo, message: 'Logged In' });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// User logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
const router = require('express').Router();
const { Post, Comment, User } = require ('../models/');

// gets all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets single post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (postData) { 
            const post = postData.get({ plain: true });
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets login session
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }

    res.render('login');
});

// gets sign up and logs in if successful
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }

    res.render('signup');
});

module.exports = router;
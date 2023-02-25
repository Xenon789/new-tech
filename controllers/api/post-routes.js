const router = require('express').Router();
const { Post } = require('../../models/');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
try {
        const newPost = await Post.create({ ...req.body , userId: req.session.userId });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', auth, async (req, res) => {
    try{
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
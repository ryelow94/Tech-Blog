const router = require('express').Router(); 
const session = require('express-session');

const {User, Post, Comment} = require('../../models') 
const withAuth = require('../../utils/auth') 

router.get('/', (req,res)=> {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    }).then(dbUserData => {
        req.session.save(()=> {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true 
            res.json(dbUserData)
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude:['password']},
        where: {
            id:req.params.id
        },
        include: [
        {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text','created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.post('/logout', withAuth, (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(()=> {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

router.post('/login', (req,res) => {
    User.findOne({
        where: {username: req.body.username}
    }).then(dbUserData=> {
        if(!dbUserData) {
            res.status(400).json({ message: 'The username cannot be found!'});
            return;
        }
        const correctPass = dbUserData.checkPassword(req.body.password);
        if(!correctPass) {
            res.status(400).json({ message: 'That password is incorrect!'})
            return;
        }
        req.session.save(()=> {
            req.session.user_id = dbusUserData.id;
            req.session.username =dbusUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbusUserData, message: 'You have been logged in!'});
        })
    })
})



module.exports = router;


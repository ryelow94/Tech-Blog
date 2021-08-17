const router = require('express').Router(); 
const session = require('express-session');

const {User} = require('../../models') 
const withAuth = require('../../utils/auth') 

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






module.exports = router


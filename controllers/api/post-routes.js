const router = require('express').Router();
const session = require('express-session');

const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
    Post.findAll({ 
            attributes: 
                [
                    "id", 
                    "title", 
                    "post_text", 
                    "created_at"
                ],
                include: 
                [
                    {
                        model: User, 
                        attributes: ["username"]
                    },
                    {
                        model: Comment, 
                        attributes: ["id", "comment_text", "post_id","user_id", "created_at"],
                        include: {
                            model: User, 
                            attributes: ["username"]
                        }
                    }
                ]
    }).then(dbPostData => {
        res.json(dbPostData);
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get("/:id", (req,res) => {
    Post.findOne({ 
        where: { id: req.params.id },
        attributes: ["id", "post_text", "title", "created_at"],
        include:[{
            model: User, 
            attributes: ["username"]
        },
        {
            model: Comment, 
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: { 
                model: User, 
                attributes: ["username"]
            }
        }
    ]
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "No post found"})
        }
        res.json(dbPostData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
}); 

router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id,
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put("/:id", withAuth, (req, res) => {
    Post.update({
        post_text: req.body.post_text,
        title: req.body.post_text
    }, 
    {
        where: { id: req.params.id },
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: "no post found to update"})
            return;
        }  res.json(dbPostData)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: { id: req.params.id },
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: "no post found to delete"})
            return;
        }  res.json(dbPostData)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});



module.exports = router;
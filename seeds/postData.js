const { Post } = require("../models")

const postData = [
    {
        title:"Lorem ipsum I", 
        post_text: "Lorem ipsum dolor sit amet",
        user_id: 1
    },
]


const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
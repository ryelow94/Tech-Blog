const { User } = require("../models")

const userData = [
    {
        username:"Ryan", 
        password: "Secretpassword",
    },
]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
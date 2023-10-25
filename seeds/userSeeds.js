const { User } = require('../models');

const userData = [
    {
        username: 'Saikou',
        email: 'bsaikou1990@gmail.com',
        password: 'saikou'
    },
    {
        username: 'Kadija',
        email: 'kadija0@gmail.com',
        password: 'kadija'
    },
    {
        username: 'Mariama',
        email: 'mariama@gmail.com',
        password: 'mariama'
    }
];

const seedUser = () => User.bulkCreate(userData)

module.exports = seedUser;
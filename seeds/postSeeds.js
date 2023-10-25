const { Post } = require('../models');

const postData = [
    {
        title: 'Today',
        post_text: 'Today will be a great day',
        post_date: 'September 07, 2023',
        user_id: 1
    },
    {
        title: 'Thursday',
        post_text: 'Last day of class for the week',
        post_date: 'September 07, 2023',
        user_id: 3
    },
    {
        title: 'Friday',
        post_text: 'FriYay is an awesome day!!',
        post_date: 'September 07, 2023',
        user_id: 2
    }
];

const seedPost = () => Post.bulkCreate(postData)

module.exports = seedPost;
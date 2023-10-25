const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Today is a good day',
        post_id: 1,
        user_id: 2
    },
    {
        comment_text: 'I love Thursday',
        post_id: 2,
        user_id: 3
    },
    {
        comment_text: 'Fridays are wondeful',
        post_id: 3,
        user_id: 2
    }
];

const seedComment = () => Comment.bulkCreate(commentData)

module.exports = seedComment;
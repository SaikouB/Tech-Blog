const sequelize = require('../config/connection');

const postSeeds = require('./postSeeds');
const commentSeeds = require('./commentSeeds');
const userSeeds = require('./userSeeds');


const seedDb = async () => {
    await sequelize.sync({ force: true });
    console.log('\n---- Database Added ----\n');

    await userSeeds();
    console.log('\n---- User Seeds Added ----\n');

    await postSeeds();
    console.log('\n---- Post Seeds Added ----\n');

    await commentSeeds();
    console.log('\n---- Comment Seeds Added ----\n');
    

    
    process.exit(0);
};

seedDb();

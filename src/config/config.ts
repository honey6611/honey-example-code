import { Sequelize } from 'sequelize';
// TODO : move credentials to env variables
export default new Sequelize('books', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

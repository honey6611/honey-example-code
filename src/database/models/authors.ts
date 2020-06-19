import Sequelize from 'sequelize';
import db from '../../config/config';

const Authors = db.define('authors', {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    createdAt: "createdat",
    updatedAt: "updatedat"
});
export default Authors;
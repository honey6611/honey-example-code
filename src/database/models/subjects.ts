import Sequelize from 'sequelize';
import db from '../../config/config';

const Subjects = db.define('subjects', {
    description: {
        type: Sequelize.STRING
    },
    createdAt: "createdat",
    updatedAt: "updatedat"
});

export default Subjects;
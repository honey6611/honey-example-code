import Sequelize from 'sequelize';
import db from '../../config/config';

const Books = db.define('books', {
    ebook_no: {
        type: Sequelize.NUMBER
    },
    title: {
        type: Sequelize.STRING
    },
    authors: {
        type: Sequelize.STRING
    },
    subjects: {
        type: Sequelize.STRING
    },
    publisher: {
        type: Sequelize.STRING
    },
    publication_date: {
        type: Sequelize.DATE
    },
    language: {
        type: Sequelize.STRING
    },
    license: {
        type: Sequelize.STRING
    },
    createdAt: "createdat",
    updatedAt: "updatedat"
});

export default Books;
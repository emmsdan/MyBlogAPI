const {
  BlogPostSchema,
  BlogCommentSchema,
  BlogViewSchema,
  InitiatorSchema
} = require('../schema');

module.exports = {
  up: (queryInterface, Sequelize) =>{
    const createAt = {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };
    const BlogPost = queryInterface.createTable(
      'BlogPosts',
      {
        ...BlogPostSchema(Sequelize),
        ...createAt
      });

    const initiator = queryInterface.createTable(
      'Initiators',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          unique: true
        },
        ...InitiatorSchema(Sequelize),
        ...createAt
      },  {
        freezeTableName: true,
      });

    const BlogView = queryInterface.createTable(
      'BlogViews',
      {
        ...BlogViewSchema(Sequelize),
        ...createAt
      });

    const BlogComment = queryInterface.createTable(
      'BlogComments',
      {
        ...BlogCommentSchema(Sequelize),
        ...createAt
      });
    return Promise.all([BlogPost, BlogView, BlogComment, initiator]);
  },
  down: (queryInterface) => Promise.all([
    queryInterface.dropTable('BlogPosts'), queryInterface.dropTable('BlogViews'), queryInterface.dropTable('Initiator'), queryInterface.dropTable('BlogComments')]),
};

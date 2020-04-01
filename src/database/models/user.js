const {
  BlogPostSchema,
  BlogCommentSchema,
  BlogViewSchema,
  InitiatorSchema
} = require('../schema');

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', BlogPostSchema(DataTypes), {});

  const Initiator = sequelize.define('Initiator',
    InitiatorSchema(DataTypes), {});

  const BlogViews = sequelize.define('BlogViews',
    BlogViewSchema(DataTypes), {});

  const BlogComments = sequelize.define('BlogComments',
    BlogCommentSchema(DataTypes), {});

  /** ------------- Setup Relationships --___---- **/

  BlogPosts.associate = (models) => {
    const { BlogViews, BlogComments } = models;
    BlogPosts.hasOne(BlogViews);
    BlogPosts.hasMany(BlogComments, { foreignKey: 'id' });
  };

  BlogComments.associate = (models) => {
    const { BlogPosts } = models;
    BlogComments.belongsTo(BlogPosts, { foreignKey: 'userId' });
  };

  Initiator.associate = (models) => {
    Object.keys(models).forEach(modelName => {
      Initiator.belongsTo(models[modelName], { foreignKey: 'refTableId' });
    });
  };

  /** -------------- Setup Hooks -----____----- **/
  BlogPosts.beforeCreate(async (fields) => {
    const createSlug = fields.title.replace(/[ ]/g,'_') + '_' +fields.userId;
    fields.slug = createSlug;
  });

  return { BlogPosts, BlogViews, BlogComments, Initiator };
};

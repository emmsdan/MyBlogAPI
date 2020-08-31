const appSettingSchema = require('../../settings/auth').authSchema;

const BlogPostSchema = (DataTypes) => {
  return  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      use: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      use: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      use: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('draft', 'deleted', 'published', 'trach'),
      defaultValue: 'draft'
    },
    type: {
      type: DataTypes.ENUM('image', 'video', 'file', 'post'),
      defaultValue: 'post'
    },
    ...appSettingSchema(DataTypes)
  };
};
console.warn('BlogPostSchema');

module.exports = BlogPostSchema;

const appSettingSchema = require('../../settings/auth').authSchema;
const BlogViewSchema = (DataTypes) => {
  return  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    blogId: {
      type: DataTypes.STRING,
      unique: true,
    },
    views: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM(['post', 'comment']),
      defaultValue: 'post',
    },
    ...appSettingSchema(DataTypes)
  };
};
console.warn('BlogViewSchema');

module.exports = BlogViewSchema;

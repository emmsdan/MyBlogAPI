const appSettingSchema = require('../../settings/auth').authSchema;
const BlogCommentSchema = (DataTypes) => {
  return  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
    },
    userType: {
      type: DataTypes.ENUM(['anonymous', 'user']),
      defaultValue: 'anonymous',
    },
    visibility: {
      type: DataTypes.ENUM(['public', 'admin']),
      defaultValue: 'public',
    },
    ...appSettingSchema(DataTypes)
  };
};

console.warn('BlogCommentSchema');

module.exports = BlogCommentSchema;

const appSettingSchema = require('../../settings/auth').authSchema;
const InitiatorSchema = (DataTypes) => {
  return  {
    refTable: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refTableId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initiatorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initiatorName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    action: {
      type: DataTypes.ENUM(['create', 'update', 'get']),
      allowNull: false,
    },
    ...appSettingSchema(DataTypes)
  };
};

module.exports = InitiatorSchema;

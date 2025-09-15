import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Complains = sequelize.define('Complains', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  complainDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  complainType: {
    type: DataTypes.ENUM,
    values: ['Private', 'Common'],
    allowNull: false,
  },
  
  complainAbout: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
  
  
}, {
  tableName: 'Complains',
});

export default Complains;










 
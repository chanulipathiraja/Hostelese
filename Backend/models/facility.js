import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Facility = sequelize.define('Facility', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  facilityType: {
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
  tableName: 'facilities',
});

export default Facility;










 
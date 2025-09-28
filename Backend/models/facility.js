import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Facility = sequelize.define('Facility', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hostelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hostels',
      key: 'id'
    }
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










 
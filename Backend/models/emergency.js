import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Hostel from './hostel.js';

const Emergency = sequelize.define('Emergency', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subwardenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subwardenContactnumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  medicalcenterName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicalcenterContactnumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ambulanceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ambulanceContactnumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  
}, {
  tableName: 'emergencies',
});

export default Emergency;








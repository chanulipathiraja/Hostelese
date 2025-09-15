import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  hostelid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  roomNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  floorNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numberofStudents: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numberofBeds: {
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
  tableName: 'rooms',
});

export default Room;










 
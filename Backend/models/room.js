import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Room = sequelize.define('Room', {
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

  roomNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  floorNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  numberofStudents: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  numberofBeds: {
    type: DataTypes.INTEGER,
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










 
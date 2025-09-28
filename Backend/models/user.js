import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
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
  emergencyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'emergencies',
      key: 'id'
    }
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  floorNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  registerNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  indexNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentPhonenumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  otherDetails: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  
}, {
  tableName: 'users',
});

export default User;











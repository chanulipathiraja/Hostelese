import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adminsName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminsPost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminHostelName: {
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, {
  tableName: 'Admins',
});

export default Admin;







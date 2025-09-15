import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Hostel = sequelize.define('Hostel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hostelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  register_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leave_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sick_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  room_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  
  
  
}, {
  tableName: 'hostels',
});

export default Hostel;








    
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentreference: {
    type: DataTypes. STRING,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  paymentAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  tableName: 'Payments',
});

export default Payment;








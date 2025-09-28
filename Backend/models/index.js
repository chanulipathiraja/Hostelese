import Hostel from './hostel.js';
import Admin from './admin.js';
import User from './user.js';
import Complains from './complains.js';
import Emergency from './emergency.js';
import Facility from './facility.js';
import Payment from './payment.js';
import Room from './room.js';

// User belongs to Hostel
User.belongsTo(Hostel, { foreignKey: 'hostelId' });
Hostel.hasMany(User, { foreignKey: 'hostelId' });

// User belongs to Emergency
User.belongsTo(Emergency, { foreignKey: 'emergencyId' });
Emergency.hasMany(User, { foreignKey: 'emergencyId' });

// User has many Complains
Complains.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Complains, { foreignKey: 'userId' });

// User has payments
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

// Hostel relations remain correct
Hostel.hasMany(Room, { foreignKey: 'hostelId' });
Hostel.hasMany(Facility, { foreignKey: 'hostelId' });


export  {
  Admin,
  Complains,
  Emergency,
  Facility,
  Hostel,
  Payment,
  Room,
  User,
};


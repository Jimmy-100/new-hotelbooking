const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('ok yse ');
});

const getAllBookings = (result) => {
  connection.query(`
    SELECT b.id, b.check_in_date, b.check_out_date, h.name AS hotel_name, r.name AS room_name, c.name AS customer_name
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    JOIN hotels h ON r.hotel_id = h.id
    JOIN customers c ON b.customer_id = c.id
  `, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

const createBooking = (newBooking, result) => {
  const { room_id, customer_id, check_in_date, check_out_date } = newBooking;
  connection.query('INSERT INTO bookings (room_id, customer_id, check_in_date, check_out_date) VALUES (?, ?, ?, ?)', 
  [room_id, customer_id, check_in_date, check_out_date], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newBooking });
  });
};

const updateBooking = (id, updatedData, result) => {
  const { check_in_date, check_out_date } = updatedData;
  connection.query('UPDATE bookings SET check_in_date = ?, check_out_date = ? WHERE id = ?', 
  [check_in_date, check_out_date, id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    
    if (res.affectedRows === 0) {
      result({ message: 'Booking not found' }, null);
      return;
    }
    
    // Fetch updated booking
    connection.query('SELECT * FROM bookings WHERE id = ?', [id], (err, updatedBooking) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, updatedBooking[0]);
    });
  });
};

const deleteBooking = (id, result) => {
  connection.query('DELETE FROM bookings WHERE id = ?', [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ message: 'Booking not found' }, null);
      return;
    }
    result(null, { message: 'Booking deleted successfully' });
  });
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking
};

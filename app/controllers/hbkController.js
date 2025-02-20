const hbkModel = require('../models/hbkModel.js');


const getBookings = (req, res) => {
  hbkModel.getAllBookings((err, data) => {
    if (err) {
      res.status(500).json({ message: 'no ok', error: err });
    } else {
      res.status(200).json(data);
    }
  });
};

const createBooking = (req, res) => {
  const newBooking = req.body;

  hbkModel.createBooking(newBooking, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'no ok', error: err });
    } else {
      res.status(201).json({
        message: 'okk',
        booking: data
      });
    }
  });
};

const updateBooking = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  hbkModel.updateBooking(id, updatedData, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'no update', error: err });
    } else {
      res.status(200).json({
        message: 'ok update',
        booking: data
      });
    }
  });
};


const deleteBooking = (req, res) => {
  const id = req.params.id;

  hbkModel.deleteBooking(id, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'no delins', error: err });
    } else {
      res.status(200).json({ message: 'ok delins' });
    }
  });
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
};

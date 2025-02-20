const express = require('express');
const app = express();
const hbkRoutes = require('./app/routes/hbkRoute.js');

app.use(express.json());


app.use('/api', hbkRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

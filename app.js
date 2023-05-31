const express = require('express');
const mongoose = require('mongoose');
const resStatus = require('./utils/resStatus');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Database connected.'))
  .catch(() => console.log('No connected to database.'));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '647799c146970e6de7f9613f',
  };

  next();
});

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(resStatus.NOT_FOUND.CODE).send({ message: resStatus.NOT_FOUND.PAGE_MESSAGE });
});

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});

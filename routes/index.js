const express = require('express');

const textRouter = require('./text');

const app = express();

app.use('/text', textRouter);

module.exports = app;

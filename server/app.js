/*
 * @Author: please
 * @Date: 2023-08-25 13:55:05
 * @LastEditors: please
 * @LastEditTime: 2023-12-26 17:40:16
 * @Description: 请填写简介
 */
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const app = express()
const server = require('http').Server(app);
const router = require('./router');
const { openUrl } = require('./utils')


const CACHE_CONTROL = 'no-store, no-cache, must-revalidate, private'


app.all('*', function(req, res, next) {
  // debugger
  // console.log(res, 'ddd')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.use(express.static(path.resolve(__dirname, '../dist'), { setHeaders }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(function(err, req, res, next) {
    res.status(500).send(err.message);
});

function setHeaders(res, path, stat) {
  res.set('Cache-Control', CACHE_CONTROL)
}

const PORT = 8111

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
})

module.exports = server
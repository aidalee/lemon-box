/*
 * @Author: please
 * @Date: 2023-11-17 13:48:46
 * @LastEditors: please
 * @LastEditTime: 2023-11-17 17:49:14
 * @Description: 请填写简介
 */
const express = require('express');
let router = express.Router();
const controller = require('./controller');
// console.log(router, 'jjj')
if(process.env.NODE_ENV === 'development') {
  router.use(function timeLog (req, res, next) {
    next()
  })
}

router.post('/project/create', controller.project.create)
router.get('/finder/files', controller.finder.files)

module.exports = router
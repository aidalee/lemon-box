/*
 * @Author: please
 * @Date: 2023-10-12 13:52:19
 * @LastEditors: please
 * @LastEditTime: 2023-10-19 10:42:45
 * @Description: 请填写简介
 */
const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn');
const viteConfigTpl = require('../templates/vite.config.tpl')
const requestTpl = require('../templates/request.tpl')
const { exec } = require('child_process');
const utils = require('../utils');
module.exports = {
  create: async(req,res,next) => {
    try {
      const { framework, ui, localPath, name } = req.body
      if(framework=='ruoyi-vue3') {
        utils.createRuoyiProject(res,localPath, name)
      }else if(framework == 'react') {
        console.log(framework, 'frameworkframework')
        utils.createReactProject(res,localPath, name)
      }else if(framework == 'wechat') {
        utils.createWechatProject(res,localPath, name)
      }
    } catch (error) {
      // next(error)
    }
  }
}
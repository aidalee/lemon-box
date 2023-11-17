/*
 * @Author: please
 * @Date: 2023-08-25 10:16:41
 * @LastEditors: please
 * @LastEditTime: 2023-11-17 14:50:55
 * @Description: 请填写简介
 */
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const spawn = require('cross-spawn') // 用于生成子进程
const os = require('os')

async function start () {
  const serverDir = path.join(__dirname, '..', 'server')
  let server;
  server = spawn('node', [path.join(serverDir, 'app.js')])
  // 捕获子进程的输出
  server.stdout.on('data', (data) => {
    console.log(`${data}`)
  })
  // 捕获子进程的错误
  server.stderr.on('data', (data) => {
    console.log(`${data}`)
  })
  // 跟踪子进程的状态
  server.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`)
  })
  // 监听子进程退出
  process.on('exit', function() {
    server.kill()
  })
}

module.exports = async() => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: '请选择部门',
      choices: [
        '云平台',
        '系统开发'
      ]
    },
    {
      type: 'input',
      name: 'username',
      message: '请输入姓名'
    }
  ]).then((answers)=>{
    const { department, username } = answers
    start()
  })
}
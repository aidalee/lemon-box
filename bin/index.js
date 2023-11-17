#!/usr/bin/env node

const program = require('commander')

program
.command('ui')
.description('start GUI🚀')
.action(()=>{
  require('./ui')()
})

program.parse(process.argv);
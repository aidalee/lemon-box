/*
 * @Author: please
 * @Date: 2023-08-25 14:36:16
 * @LastEditors: please
 * @LastEditTime: 2023-12-26 17:40:42
 * @Description: 工具函数封装
 */

const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid');
const {exec} = require("child_process");
const spawn = require('cross-spawn');
const viteConfigTpl = require('./templates/vite.config.tpl')
const requestTpl = require('./templates/request.tpl')

/**
 * @description: 
 * @param {*} url
 * @return {*}
 */
function openUrl (url) {
  switch (process.platform) {
    // mac系统使用以下命令打开url 在浏览器
    case "darwin":
      exec(`open ${url}`)
      break;
    // window系统使用以下命令打开url 在浏览器
    case "win32":
      exec(`start ${url}`)
      break;
    default:
      exec(`open ${url}`)
  }
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}

// 判断是图片
function isImage(name) {
    return /\.(png|jpg|gif|jpeg)$/.test(name.toLowerCase());
}

/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary}
 */
function file (filePath) {
  let content = fs.readFileSync(filePath, 'binary')
  return content
}

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function walk( reqPath, isShowHideFile = true ){
  let files = fs.readdirSync( reqPath );
  let dirList = [], fileList = [], item = ''

  for(item of files) {
    const stat =  fs.lstatSync(`${reqPath}/${item}`)
    // 判断是否显示隐藏文件
    if(isShowHideFile) {
      if(stat.isDirectory() && item[0] !== '.') {
        dirList.push( {type: 'dir', name: item} )
      } else if (stat.isFile() && item[0] !==  '.') {
        fileList.push( {type: 'file', name:item } );
      }
    } else {
      stat.isDirectory()
      ? dirList.push( {type: 'dir', name: item} )
      : fileList.push( {type: 'file', name:item } );
    }
  }
  let result = dirList.concat( fileList );
  return result;
}
/**
 * 删除文件夹
 * @param {String} path
 */
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}
/**
 * 读取文件
 * @param {String} path
 */
function readFilePromise (path) {
  return new Promise((resolve, rejecct) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err) {
        rejecct(err)
        throw err
      }
      else resolve(JSON.parse(data))
    })
  })
}

/**
 * 创建文件&&写入
 * @param {String} path
 * @param {String} data 写入的数据
 */
function createFilePromise (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if(err) {
        reject(err)
        throw err
      } else {
        resolve(true)
      }
    })
  })
}
/**
 * 异步判断是否存在文件夹
 * @param {String} path
 */
function isExistsPromise(path) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      resolve(exists)
    })
  })
}
/**
 * 创建文件夹
 * @param {String} path
 * @dec 异步 Promise
 */
function mkdirPromise(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path,  (err) => {
      if(err) {
        reject(err)
        throw err
      } else {
        resolve(true)
      }
    });
  })
}
/**
 * 根据id 修改值
 * @param {Array} array
 * @param {Object} obj 修改的对象 包含 => id
 */
function modifyData (array, obj) {
  const { id } = obj
  array.map(item => {
    if(item.id === id){
      for(let key of Object.keys(obj)) {
        if(Object.keys(item).includes(key)){
          item[key] = obj[key]
        }
      }
    }
  })
  return array
}
/**
 * 根据属性值筛选删除
 * @param {Array} array
 * @param {Object} query 根据对应的对象删除
 */
function deleteData (array, query) {
  const keys = Object.keys(query)
  return array.filter(item => {
    return keys.every(key => item.hasOwnProperty(key) && item[key] !== query[key])
  })
}
/**
 * 根据参数筛选对应数据
 * @param {Array} array
 * @param {query} obj 根据对应参数筛选
 */
function filterData (array, query) {
  const keys = Object.keys(query);
  return array.filter(m => {
      return keys.every(key => m.hasOwnProperty(key) && m[key] === query[key]);
  });
}
/**
 * 为数组每个对象增id
 * @param {Array} arr 增加id的数据
 */
function addId(arr) {
  return arr.map(item => {
    return {
      id: uuid(),
      ...item
    }
  })
}

/**
 * 转换布尔值
 * @param {Array} arr
 * @param {Array} keys 需要转换的布尔的Key值
 */
function toBoolean (arr, keys) {
  return arr.map(item => {
   for(let key of keys) {
     item[key] = item[key] === "false" ?  false : true
     return item
    }
  })
}

function createRuoyiProject(res,localPath, name) {
  const ls = spawn('pnpm', ['create', 'vite', name, '--template', 'vue'], {
    cwd: localPath
  });
  ls.stdout.on('data', async (data) => {
      // console.log(`stdout: ${data}`); 
  });
  ls.stderr.on('data', (data) => {
      // console.log(`stderr: ${data}`);
  });

  ls.on('exit', async (code) => {

    const srcPath = path.join(__dirname ,`materials/ruoyi-vue3/src`);
    
    const vitePath = path.join(__dirname,`materials/ruoyi-vue3/vite`);
    const pkgPath = path.join(__dirname,`materials/ruoyi-vue3/package.json`);
    const viteConfigPath = path.join(__dirname,`materials/ruoyi-vue3/vite.config.js`);
    await fs.emptyDir(path.join(localPath, `/${name}/src`))
    await fs.copy(srcPath, path.join(localPath, `/${name}/src`));
    await fs.copy(pkgPath, path.join(localPath, `/${name}/package.json`));
    await fs.copy(viteConfigPath, path.join(localPath, `/${name}/vite.config.js`));
    await fs.copy(vitePath, path.join(localPath, `/${name}/vite`));
    
    res.status(200).send({
      success: true,
      data: code,
      message: '创建成功'
    });
  })
}

function createReactProject(res,localPath, name) {
  const ls = spawn('pnpm', ['create', 'vite', name, '--template', 'react-ts'], {
    cwd: localPath
  });
  ls.stdout.on('data', async (data) => {
      console.log(`stdout: ${data}`); 
  });
  ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
  });

  ls.on('exit', async (code) => {
    const srcPath = path.join(__dirname,`materials/react/src`);
    const pkgPath = path.join(__dirname,`materials/react/package.json`);
    const viteConfigPath = path.join(__dirname,`materials/react/vite.config.ts`);
    const tsConfigPath = path.join(__dirname,`materials/react/tsconfig.json`);
    await fs.emptyDir(path.join(localPath, `/${name}/src`))
    await fs.copy(srcPath, path.join(localPath, `/${name}/src`));
    await fs.copy(pkgPath, path.join(localPath, `/${name}/package.json`));
    await fs.copy(viteConfigPath, path.join(localPath, `/${name}/vite.config.ts`));
    await fs.copy(tsConfigPath, path.join(localPath, `/${name}/tsconfig.json`));
    console.log(res, 'resss')
    res.status(200).send({
      success: true,
      data: code,
      message: '创建成功'
    });
  })
}

function createWechatProject(res,localPath, name) {
  const mainPath = path.join(localPath, `/${name}`);
  if (!fs.pathExistsSync(mainPath)) {
    fs.mkdirs(mainPath, async (err) => {
      if (err) {
        console.error(err);
      } else {
        const wechatPath = path.join(__dirname,`materials/wechat`);
        await fs.copy(wechatPath, mainPath);
        res.status(200).send({
          success: true,
          data: null,
          message: '创建成功'
        });
      }
    });
  }else {
    res.status(200).send({
      success: true,
      data: null,
      message: '创建失败，当前目录已存在且不为空'
    });
  }
}

module.exports = {
    // getWorkingDirectory,
    mkdirsSync,
    isImage,
    file,
    walk,
    delDir,
    addId,
    readFilePromise,
    createFilePromise,
    isExistsPromise,
    mkdirPromise,
    filterData,
    toBoolean,
    modifyData,
    deleteData,
    openUrl,
    createRuoyiProject,
    createReactProject,
    createWechatProject
}

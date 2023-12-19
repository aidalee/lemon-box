<!--
 * @Author: please
 * @Date: 2023-10-12 14:05:42
 * @LastEditors: please
 * @LastEditTime: 2023-12-19 17:12:24
 * @Description: 请填写简介
-->
<template>
  <el-form label-width="120px" :model="formInline" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="formInline.name" placeholder="请填写项目名称" />
    </el-form-item>
    <el-form-item label="目录">
      <el-input v-model="formInline.localPath" readonly placeholder="请选择目录" @click="onChoosePath" />
    </el-form-item>
    <el-form-item label="模版选择">
      <!-- <el-select
        v-model="formInline.framework"
        placeholder="请选择框架"
        clearable
      >
        <el-option label="vue3" value="vue3" />
        <el-option label="react" value="react" />
        <el-option label="ruoyi-vue3" value="ruoyi-vue3" />
        <el-option label="微信小程序" value="wechat" />
      </el-select> -->
      <el-row gutter="10">
        <el-col
          v-for="(item, index) in templateList"
          :key="item.value"
          :span="8"
        >
          <el-card style="width: 240px" :class="[activeIndex == index ? 'active': '']" @click="()=>onClick(index, item)" :body-style="{ padding: '0px' }">
            <div class="img" :style="{backgroundImage: `url(${item.img})`}"></div>
            <div style="padding: 14px">
              <span>{{item.label}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">create</el-button>
    </el-form-item>
  </el-form>
  <el-dialog
    v-model="dialogVisible"
    title="选择目录"
    width="30%"
  >
    <div class="project-import">
        <div class="operate">
            <el-button size="small" @click="back(-1)">
                返回
            </el-button>
            <el-button size="small" v-for="(name, index) of currentPathArr" :key="index" @click="back(index + 1)">
                {{name}}
                <el-icon v-if="!name"><HomeFilled /></el-icon>
            </el-button>
        </div>
        <div class="list">
            <div class="list-item" :key="index" v-for="(item, index) of fileList" @click="into(item)">
                <el-icon v-if="item.type === 'file'"><Files /></el-icon>
                <el-icon  v-if="item.type === 'dir'"><Folder /></el-icon>
                <a href="javascript:;">{{item.name}}</a>
            </div>
        </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onConfirm">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-upload
    class="upload-demo"
    :action="uploadFileUrl"
    :show-file-list="false"
    multiple
    :headers="headers"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="10"
    :on-exceed="handleExceed"
    :on-success="handleUploadSuccess"
  >
    <el-button type="primary">点击上传图片到OSS(一次性最多上传10个)</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
  <div class="uploaded-img-list">
    <div class="img-list-item" v-for="(item, index) in imgFileList" :key="index">
      <div class="img-list-item-wrapper">
        <div class="img-list-item-left">
          <el-image style="width: 100px; height: 100px" :src="item.url" fit="contain" />
          <p>{{item.url}}</p>
        </div>
        <el-icon @click="()=>copy(item.url)"><CopyDocument /></el-icon>
      </div>
      <el-divider />
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import useClipboard from 'vue-clipboard3'

import { useRoute } from 'vue-router'

import { httpCreateProject, httpGetFinderFiles } from './api'
import reactSrc from './assets/react-admin.png'
import vueSrc from './assets/vue-admin.png'
import wechatSrc from './assets/wechat.png'
const { toClipboard } = useClipboard()

const formInline = reactive({
  framework: '',
  localPath: '',
  name: 'test-test'
})

const templateList = ref([
  {label: 'react admin', value: 'react', img: reactSrc},
  {label: 'vue admin', value: 'ruoyi-vue3', img: vueSrc},
  {label: '微信小程序', value: 'wechat', img: wechatSrc}
])

let dialogVisible = ref(false)
let fileList = ref([])
let currentPath = ref('')

let activeIndex = ref(null)

let currentPathArr = computed(()=>currentPath.value.split('/'))

const onClick = (index, item) => {
  activeIndex.value = index
  formInline.framework = item.value
}

const onChoosePath = () => {
  dialogVisible.value= true
}
const onSubmit = () => {
  httpCreateProject({
    framework: formInline.framework,
    localPath: formInline.localPath,
    name: formInline.name
  }).then(res=>{
    if(res.success) {
      ElMessage.success(res.message)
    }
  })
}

const back = (index) => {
  const length = currentPathArr.value.length;
  if (length === 1) {
      return;
  }
  let arr = [].concat(currentPathArr.value);
  arr.splice(index, index === -1 ? 1 : length);
  currentPath.value = arr.join('/');
}
const into = ({name, type}) => {
  if (type === 'dir') {
    currentPath.value += `/${name}`;
  }
}
const getFolder = (filePath) => {
  httpGetFinderFiles({filePath}).then(res=>{
    if (res.code && res.code === 'ENOENT') {
      fileList.value = [];
      return;
    }
    fileList.value = res.data;
  })
}
const onConfirm = () => {
  dialogVisible.value = false
  formInline.localPath = currentPath.value
}
const MODE = import.meta.env.MODE
let preUrl
if(MODE == 'development' || MODE == 'test') {
  preUrl = '/api'
}else {
  preUrl = ''
}
//  https://an-dev.soterea.cn/api/common/upload
const uploadFileUrl = ref(preUrl+`/common/upload`)

let route = useRoute()
let search = window.location.search

search = search.substring(1, search.length)

var token = search.split("=")[1]

if(token) {
  localStorage.setItem('token', token)
}

const headers = ref({ token: localStorage.getItem('token') });

const imgFileList = ref([])

const copy = async (value) => {
  try {
    await toClipboard(value)
    ElMessage.success('复制成功')
  } catch (e) {
    console.error(e)
  }
}

const handleUploadSuccess = (res,  uploadFile, uploadFiles) => {
  let item = {}
  if(res.ok && res.result !=null ) {
    item.name = res.result.name
    item.url = res.result.url
    imgFileList.value.push(item)
  }
}
const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

watch(currentPath, (val)=>{
  getFolder(val)
}, {immediate: true})

</script>
<style>
.el-card, div {
  box-sizing: border-box;
}
.active {
  border: 2px solid #07c160 !important;
}
.img {
  width: 240px;
  height: 180px;
  background-size: cover;
  background-repeat: no-repeat;
}
.list-item {
  text-align: left;
  display: flex;
  align-items: center;
}
.el-form-item__label {
  color: #fff !important;
}
.list-item a {
  padding-left: 4px;
}
.img-list-item .img-list-item-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.img-list-item-left {
  display: flex;
  align-items: center;
}
.img-list-item-left p {
  padding-left: 12px;
}
</style>
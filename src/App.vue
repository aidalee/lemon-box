<!--
 * @Author: please
 * @Date: 2023-10-12 14:05:42
 * @LastEditors: please
 * @LastEditTime: 2023-10-19 14:23:15
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
</template>
<script setup>
import { reactive, ref, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { httpCreateProject, httpGetFinderFiles } from './api'
import reactSrc from './assets/react-admin.png'
import vueSrc from './assets/vue-admin.png'
import wechatSrc from './assets/wechat.png'
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
const getFloder = (filePath) => {
  console.log(filePath,'ooo')
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
watch(currentPath, (val)=>{
  getFloder(val)
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
</style>
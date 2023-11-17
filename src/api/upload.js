/*
 * @Author: please
 * @Date: 2023-11-17 10:21:49
 * @LastEditors: please
 * @LastEditTime: 2023-11-17 10:25:42
 * @Description: 请填写简介
 */
import request from '../utils/request.js'

export const httpGetFinderFiles = (params) => request.post('/upload-api/common/upload', params)
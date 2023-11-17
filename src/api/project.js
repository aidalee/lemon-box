/*
 * @Author: please
 * @Date: 2023-10-12 14:44:49
 * @LastEditors: please
 * @LastEditTime: 2023-10-12 16:56:35
 * @Description: 请填写简介
 */
import request from '../utils/request.js'

export const httpCreateProject = (params) => request.post('/api/project/create', params)

export const httpGetFinderFiles = (params) => request.get('/api/finder/files', params)
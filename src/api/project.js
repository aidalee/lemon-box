/*
 * @Author: please
 * @Date: 2023-10-12 14:44:49
 * @LastEditors: please
 * @LastEditTime: 2023-11-17 17:45:40
 * @Description: 请填写简介
 */
import request from '../utils/request.js'

export const httpCreateProject = (params) => request.post('/project/create', params)

export const httpGetFinderFiles = (params) => request.get('/finder/files', params)
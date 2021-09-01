/*
 * @Author: your name
 * @Date: 2021-06-16 15:35:10
 * @LastEditTime: 2021-08-30 17:00:40
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/index.js
 */

// 样式
import "./assets/css/global.css";
import "./assets/css/index.css";
// 初始化
import navigation from "./js/util/navigation";
import { renderContent } from "./js/pages/renderContent";
navigation();
renderContent();

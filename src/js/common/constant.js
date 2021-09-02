/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 09:57:10
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-02 14:30:36
 */

const CACHE_KEY = {
  CACHE_TODO: "CACHE_TODO", //本地缓存
};
const USER_TEXT = {
  USER_ACCOUNT: "请输入11位手机号",
  USER_PW: "请输入包含字母，数字的6～16位密码",
  USER_NAME: "请输入至少包含两个字符的用户名",
  USER_LOGIN_ERRMSG: "请输入正确的登录信息",
  USER_REGISTER_ERRMSG: "请输入正确的注册信息",
  USER_REGISTER_SUCCSMSG: "注册成功，请登录",
};
const LOCAL_ERRMSG = {
  CHANGEMSG: "勾选任务项失败",
  DELMSG: "删除失败",
  EDITEMSG: "编辑待办项失败",
};
const REG_STR = {
  ACCOUNT_REG: /^1[3456789]\d{9}$/,
  PW_REG: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
  USERNAME_REG: /[\u4e00-\u9fa5|\w]{2,}/,
};
const CHECK_MSG = {
  ACCOUNT_MSG: "请输入正确的手机号",
  PW_MSG: "请输入包含字母,数字的6～16密码",
  USERNAME_MSG: "请输入至少包含两个字符的用户名",
};
const TASK_EMPTY = {
  TODAY_TODO_MSG: "今日待办项已全部完成～",
  TODAY_DONE_MSG: "今日还没有待办项已完成～",
  FINISH_MSG: "没有待办项已完成～",
  UNFINISH_MSG: "所有待办项已完成～",
  RECYCLE_MSG: "回收站为空～",
};
const COMFIRM = {
  COMFIRM_SYNC_MSG: "是否同步本地数据?",
  COMFIRM_LOGOUT_MSG: "您确定退出账号吗?",
  COMFIRM_ADD_MSG: "您确定添加该待办项吗?",
  COMFIRM_EDIT_MSG: "您确定修改该待办项吗?",
  COMFIRM_CLEAR_MSG: "您确定清空回收站吗?",
};
export {
  CACHE_KEY,
  USER_TEXT,
  LOCAL_ERRMSG,
  REG_STR,
  CHECK_MSG,
  TASK_EMPTY,
  COMFIRM,
};

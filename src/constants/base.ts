/* eslint-disable no-template-curly-in-string */
export const USER_NOT_LOGIN = 1000013;
export const USER_NO_PRIVILEGE = 1000014;
export const USER_NO_AUTH = 1000015;

export const baseTablePagniation = {
  pageSize: 50,
  showTotal: (total: number) => `总计 ${total} 条`,
};

export const validateMessages = {
  required: '${name} 是必填项不能为空',
};

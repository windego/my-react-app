const checkAuth = (authName: number) => {
  // const { privilege_list, is_super } = userInfo;
  // if (is_super) return true;
  // if (privilege_list.length) return false;
  // const hasAuth = privilege_list.some(item => {
  //   return item.id === authName;
  // });
  return true;
};

export default checkAuth;

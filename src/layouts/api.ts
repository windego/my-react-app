import { get } from '@utils/request';

/**
 * 获取用户信息
 */
export const getUserInfo = () => get<IUserInfo>('/react/user/userinfo');

/**
 * 获取市场城市下拉选项
 */
export const getMarketCityDMApi = () => get<IListResponse<MarketItem>>('/react/config/authlist');
/**
 * 获取市场城市下拉选项
 */
// export const getMarketCityDMApi = () => get<IListResponse<MarketItem>>('/management/config/dmlist');

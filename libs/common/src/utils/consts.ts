/**
 * Auth headers
 */
export const AUTHORIZATION = 'Authorization';
/**
 * Auth headers 前缀
 */
export const AUTHORIZATION_PREFIX = 'Bearer';
/**
 * request id
 */
export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

/**
 * webpack DefinePlugin var
 */
// 打包时间
declare const BUILD_DATE: string;
const __BUILD_DATE__ = BUILD_DATE;

export { __BUILD_DATE__ as BUILD_DATE };

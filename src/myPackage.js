// @ts-check

/**
 * 프로젝트 초기화 함수
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.urls
 * @returns boolean
 */
export function init(config) {
  return true;
}

/**
 * 프로젝트 종료 함수
 * @param {number} count
 * @returns number
 */
export function exit(count) {
  return count + 1;
}

/**
 * 
 * @param {string} date_string 
 * @returns {string} 日付: *年*月*日
 */
export const getDate = (date_string) => {
  date_string = date_string.split('T')

  /**
   * @param {Array} y_m_d // 日付の配列(要素は数値) [年, 月, 日]
   * @param {Array} h_m_s // 時間の配列(要素は数値) [時, 分, 秒]
   * @param {Object} now // 現在時刻
   */
  const y_m_d = date_string[0].split('-').map(Number)
  const h_m_s = date_string[1].split('.')[0].split(':').map(Number)
  
  return `${y_m_d[0]}年${y_m_d[1]}月${y_m_d[2]}日`;
}
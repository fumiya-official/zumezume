/**
 * 半角から全角に変換
 * @param {string} text - 全角変換する文字列
 * @return {string} - 全角変換した文字列
 */
export const toZenkaku = (text) => {
  // 半角文字を全角文字に変換
  const zenkaku_words = text.replace(/[!-~]/g, function (char) {
    return String.fromCharCode(char.charCodeAt(0) + 0xfee0)
  })

  // 半角スペースを全角スペースに変換
  const zenkaku_space = zenkaku_words.replace(/\s/g, function (char) {
    if (char.match(/\n/) || char.match(/\r/) || char.match(/\t/) || char.match(/\f/)) {
      return char
    }
    else {
      return "　"
    }
  });
  
  return zenkaku_space
}
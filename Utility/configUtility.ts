
/**
 * next.config.jsで定義した定数の値は(string|undefined)のUNION型になるため
 * typrofでstring型で絞り込む
 * @param key 定数のキー（next.config.jsを参照）
 * @returns string型の定数の値
 */
export const getConfig = (key : string | undefined) => {
    if('string' === typeof key) {
        return key;
    } else {
        return '';
    }
}

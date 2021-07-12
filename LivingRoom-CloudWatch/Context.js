/**
 * @typedef {Object} ContextProps
 * @property {Object} natureRemo - NatureRemoのプロパティ
 * @property {string} natureRemo.accessKey - NatureRemoのAPIアクセスキー
 * @property {Object} sheet - シートのプロパティ
 * @property {string} id - スプレッドシートのID
 * @property {string} name - シートの名前
 */
const Context = (() => {
    const props = PropertiesService.getScriptProperties();

    const /** ContextProps  */ obj = {
        natureRemo: {
            accessKey: props.getProperty('REMO_ACCESS_KEY'),
        },
        sheet: {
            id: props.getProperty('SHEET_ID'),
            name: 'log'
        }
    };

    return obj;
})();
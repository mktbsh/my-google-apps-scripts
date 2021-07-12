const LogSheet = (()=> {
    const privates = new WeakMap();
  
    return class LogSheet {
      constructor({ sheet: { id, name }}) {
        const sheet = SpreadsheetApp.openById(id).getSheetByName(name);
        privates.set(this, {
          sheet,
          data: sheet.getDataRange().getValues()
        });
      }
  
    /**
     * Returns the number of rows.
     * データの数を返します。
     * @returns {number} count
     */
      getCount() {
        const { data } = privates.get(this);
        return data.length;
      }

      /**
       * Inserts the received temperature value into the line specified by the second argument.
       * 受け取った気温の数値を第二引数で指定された行に挿入します。
       * @param {numbet} temperature 
       * @param {number} row 
       */
      insert(temperature, row) {
        const { sheet } = privates.get(this);
        const values = [[new Date(), temperature, `=ARRAYFORMULA(TEXT(A${row},"YYYYMMDDHH"))`]];
        sheet.getRange(row, 1, 1, 3).setValues(values);
      }
  
      /**
       * Add a new row and set the data.
       * @param {number} temperature 
       */
      insertLast(temperature) {
        this.insert(temperature, this.getCount() + 1);
      }
    }
  })();
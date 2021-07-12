// TODO: refactoring

function graphData(record, mode) {
    console.log(typeof record[0]);
    const date = new Date(record[0]);
    switch (mode) {
      case 'day':
        date.setMinutes(00);
        record[0] = Utilities.formatDate(date, 'Asia/Tokyo', 'HH:mm');
        return record;
        break;
      case 'month':
        record[0] = Utilities.formatDate(date, 'Asia/Tokyo', 'MM/dd');
        return record;
        break;
      default:
        break;
    }
  }
  
  function chartTitle(date, mode) {
    switch (mode) {
      case 'day':
        const d = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd');
        return `${d}の室温`;
        break;
      case 'month':
        const m = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM');
        return `${m}の気温変化`;
        break;
      default:
        break;
    }
  }
  
  function postMonthlyGraph() {
    if (getToday().getDate() !== 1) return;
    
    const previous = getMonthBeginningAndMonthEnd(getYesterday());
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataTable = Charts.newDataTable().addColumn(Charts.ColumnType.STRING, '時間').addColumn(Charts.ColumnType.NUMBER, '気温');
    sheet.getRange(2, 1, sheet.getLastRow(), 2).getValues().forEach(function (row) {
      if (timeInRange(previous.begin, previous.end, new Date(row[0]))) {
        dataTable.addRow(graphData(row, 'month'));
      }
    });
    
    const chart = Charts.newLineChart()
    .setDataTable(dataTable.build())
    .setRange(0, 40)
    .setTitle(chartTitle(previous.begin, 'month'))
    .setOption('curveType', 'function')
    .setOption('width', 1280)
    .setOption('height', 720)
    .setOption('legend', {position: 'in', textStyle: {color: 'blue', fontSize: 16}})
    .setOption('chartArea', {width: '90%', height: '85%'})
    .build();
    
    const name = Math.floor(Math.random() * 10000000);
    const blob = chart.getAs('image/png').setName(name);
    
    //DriveApp.createFile(blob);
    postToLine({'imageFile': blob, 'message': '\n\n【定期配信】\n先月の温度変化グラフ'});
  }

  function postImage() {
    const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SID')).getSheetByName('log');
    const data = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, '時間')
    .addColumn(Charts.ColumnType.NUMBER, '気温');

    const origin = ss.getRange(2, 1, ss.getLastRow(), 2).getValues();
    const today = getToday(00, 00, 00), yesterday = getYesterday(00, 00, 00);
    
    origin.forEach(function (row) {
      if (timeInRange(yesterday, today, new Date(row[0]))) {
        data.addRow(graphData(row, 'day'));
      }
    });
    
    const chart = Charts.newLineChart()
    .setDataTable(data.build())
    .setRange(0, 40)
    .setTitle(chartTitle(yesterday, 'day'))
    .setOption('width', 1280)
    .setOption('height', 720)
    .setOption('legend', {position: 'in', textStyle: {color: 'blue', fontSize: 16}})
    .setOption('chartArea', {width: '90%', height: '85%'})
    .build();
    
    const blob = chart.getAs('image/png');
    postToLine({'imageFile': blob, 'message': '\n\n【定期配信】\n前日の温度変化グラフ'});
  }
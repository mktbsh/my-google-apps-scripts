function remo() {
    const logSheet = new LogSheet(Context);
    const remo = new NatureRemo(Context.natureRemo.accessKey);
    const data = remo.getDevices();
    const temp = data.newest_events.te.val
    logSheet.insertLast(temp);

    if (temp >= 29.5) {
        const payload = {'message': '\n\n現在の室温は《' + temp + '℃》です。'};
        postToLine(payload);
    }
}
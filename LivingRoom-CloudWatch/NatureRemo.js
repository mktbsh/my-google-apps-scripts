const NatureRemo = (() => {
    const privates = new WeakMap();

    return class NatureRemo {
        constructor(accessKey) {
            privates.set(this, {
                accessKey,
                baseUrl: 'https://api.nature.global'
            });
        }

        getDevices() {
            const { accessKey, baseUrl } = privates.get(this);
            const response = UrlFetchApp.fetch(`${baseUrl}/1/devices`, {
                methods: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessKey}`
                }
            });

            const [ data ] = JSON.parse(response.getContentText('UTF-8'));

            return data;
        }
    }
})();
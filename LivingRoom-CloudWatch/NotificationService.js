const NotificationService = (() => {
  const privates = new WeakMap();

  class NotificationService {
      /**
       * 
       * @param {Context} ctx 
       */
      constructor(ctx) {
          privates.set(this, {
            line: {
              url: 'https://notify-api.line.me/api/notify',
              token: ctx.notification.lineToken
            }
          });
      }

      toLine(message) {
        const { line } = privates.get(this);
        UrlFetchApp.fetch(line.url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${line.token}`
          },
          payload: {
            message: message
          }
        });
      }
  }

  return new NotificationService();
})();
export default {
  log(options, isString) {
    // eslint-disable-next-line no-console
    console.log(
      options.url,
      isString ? JSON.stringify(this.getRequestParams(options)) : this.getRequestParams(options),
    );
  },

  consoleRequestParams(url, options) {
    const params = this.getRequestParams(options);
    // eslint-disable-next-line no-console
    console.log(`${url} requestParams:\r\n${JSON.stringify(params, null, 4)}`);
  },

  getRequestParams(options) {
    const type = options.type;
    const url = options.url;
    const body = options.body;
    let params = {};

    switch (type) {
      case 'POST':
        try {
          params = JSON.parse(body);
        } catch (e) {
          params = body;
        }
        break;
      case 'GET':
        if (url.indexOf('?') >= 0) {
          const query = url.substr(url.indexOf('?') + 1);
          const lets = query.split('&');
          for (let i = 0; i < lets.length; i++) {
            const pair = lets[i].split('=');
            // If first entry with this name
            if (typeof params[pair[0]] === 'undefined') {
              params[pair[0]] = decodeURIComponent(pair[1]);
              // If second entry with this name
            } else if (typeof params[pair[0]] === 'string') {
              const arr = [params[pair[0]], decodeURIComponent(pair[1])];
              params[pair[0]] = arr;
            } else {
              params[pair[0]].push(decodeURIComponent(pair[1]));
            }
          }
        }
    }

    return params;
  },
};

import request from 'request';
// Promisify request
// since request's body callback parameter is any, so is ours.
const get = (url: string): any => {
    return new Promise<any>((resolve, reject) => {
        request.get(
            {
                uri: url,
                headers: {
                    Accept: 'application/json'
                }
            },
            (err, resp, body) => {
                if (err) return reject(err);
                return resolve(body);
            }
        );
    });
};

export { get };

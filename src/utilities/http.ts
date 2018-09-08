import request from 'request';
const get = (url: string): any => {
    //TODO: create interface for return type
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

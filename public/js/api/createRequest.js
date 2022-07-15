/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new FormData();
    let queryParams = '';

    if (options.data !== undefined) {
        if (options.method === 'GET') {
        queryParams = '?' + Object.entries(options.data).map(
            ([key, value]) => '${encodeURIComponent(key)}=${encodeURIComponent(value)}').join('&');
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
        }
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let err = null;
            let response = null;

            if (xhr.status === 200) {
                if (xhr.response?.success) {
                    response = xhr.response;
                } else {
                    err = xhr.response;
                } 
            } else {
                err = new Error('...');
            }
            
            options.callback(err, response);
            }
    };



    xhr.open( options.method, options.url + queryParams);
    xhr.send(formData);

    return xhr;
};

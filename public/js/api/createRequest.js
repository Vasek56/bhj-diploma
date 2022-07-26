/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new FormData();
    

    if (!options.data) {
        if (options.method === 'GET') {
        const queryParams = Object.entries(options.data).map(
            ([key, value]) => `${key}=${value}`).join('&');
            if (queryParams) {
                options.url += '?' + queryParams;
            }
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
            }
        }
    

    xhr.onload = function() {
            options.callback.call(this, null, xhr.response ) 
    };

    xhr.onerror = function () {
        let err = new Error ('Ошибка');
        options.callback.call(this, err);
    };


    xhr.open( options.method, options.url);
    xhr.send(formData);

    return xhr;
};

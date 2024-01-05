module.exports = (url) => {
    const _url = url.toString();
    let result = '/';

    const secondSlashIndex = _url.indexOf('/', _url.indexOf('/') + 1);

    if (secondSlashIndex !== -1) {
        result = _url.slice(0, secondSlashIndex);
    }

    return result;
};

module.exports = {
    layout: 'layouts/event.njk',
    title: 'Sự kiện',
    eleventyComputed: {
        // permalink: (data) => `${data.page.fileSlug}/index.html`,
        year: function (data) {
            return new Date(data.date || data.page.date).getFullYear();
        },
        image: (data) => {
            if (data.image) {
                if (data.image.search(/^https?:\/\//) !== -1) {
                    return data.image;
                }
                return `/assets/img/events/${data.image}`;
            } else {
                return false;
            }
        },
    },
};

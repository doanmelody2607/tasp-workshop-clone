const { execSync } = require('child_process');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const localImages = require('eleventy-plugin-local-images');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

const input = 'src';
const output = 'public';

module.exports = function (eConfig) {
    eConfig.addPlugin(pluginRss, {
        posthtmlRenderOptions: {
            closingSingleTag: 'default', // opt-out of <img/>-style XHTML single tags
        },
    });
    // App plugins
    eConfig.addPlugin(lazyImagesPlugin, {
        imgSelector: '.page-lazy-image img',
        maxPlaceholderWidth: 25,
        // scriptSrc:
        //   'https://cdn.jsdelivr.net/npm/vanilla-lazyload@16.1.0/dist/lazyload.min.js',
    });

    eConfig.addPassthroughCopy(`${input}/img`);
    eConfig.addPassthroughCopy(`${input}/assets/img/**/*`);

    eConfig.addPassthroughCopy({
        [`${input}/members/img/**/*`]: '/assets/img/members',
        [`${input}/posts/img/**/*`]: '/assets/img/posts',
        [`${input}/events/img/**/*`]: '/assets/img/events',
        [`${input}/about/img/**/*`]: '/assets/img/about',
        'node_modules/htmx.org/dist/htmx.min.js': 'assets/js/htmx.min.js',
    });

    eConfig.addWatchTarget(`${input}/assets/js/`);

    eConfig.setDynamicPermalinks(true);

    eConfig.addFilter('readableDate', require('./lib/filters/readableDate'));
    eConfig.addFilter('minifyJs', require('./lib/filters/minifyJs'));
    eConfig.addFilter('convertToGroupName', require('./lib/filters/convertToGroupName'));
    eConfig.addFilter('firstPathUrl', require('./lib/filters/getFirstPathUrl'));

    eConfig.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

    eConfig.setServerOptions({
        watch: [
            `./${output}/assets/css/styles.css`,
            `./${output}/posts/*`,
            `./${output}/members/*`,
            `./${output}/events/*`,
        ],
    });

    eConfig.addCollection('posts', require('./lib/collections/posts'));
    eConfig.addCollection('tagList', require('./lib/collections/tagList'));
    eConfig.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
    eConfig.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));
    eConfig.addCollection('allPageByTags', require('./lib/collections/allPageByTags'));

    eConfig.addCollection('groupList', require('./lib/collections/groupList'));
    eConfig.addCollection('userGroups', require('./lib/collections/userGroup'));
    // collections memeber allow group
    eConfig.addCollection('memberByGroup', require('./lib/collections/memberByGroup'));

    // collection event
    eConfig.addCollection('events', require('./lib/collections/events'));

    return {
        dir: {
            input,
            output,
        },
        templateFormats: ['md', 'njk', 'html'],
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
    };
};

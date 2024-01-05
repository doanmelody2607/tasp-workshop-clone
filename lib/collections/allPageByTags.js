module.exports = (coll) => {
  const tagList = require('./tagList')(coll);
  const pagedPosts = [];

  Object.keys(tagList).forEach((tagName) => {
    const taggedPosts = [...coll.getFilteredByTag(tagName)].reverse();

    pagedPosts.push({
      tagName,
      posts: taggedPosts,
    });
  });

  return pagedPosts;
};

function fromEntries(iterable) {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val;

        return obj;
    }, {});
}

/* Collection output format:
{
  tagName: numberOfPostsWithTagName,
  ...
}
*/
module.exports = (coll) => {
    const dataUserGroup = require('./userGroup')(coll);

    const groupList = dataUserGroup
        .reduce((user_group, user) => {
            if ('user_group' in user.data) {
                user_group = user_group.concat(user.data.user_group);
            } else {
                user_group = user_group.concat('other')
            }

            return [...new Set(user_group)];
        }, [])
        .map((user_group) => [user_group, dataUserGroup.filter((user) => user.data.user_group ? user.data.user_group.includes(user_group).length : 0)])
        .sort((a, b) => b[1] - a[1]);

    return fromEntries(groupList);
};

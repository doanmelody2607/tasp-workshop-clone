module.exports = (coll) => {
    const memberByGroup = []
    const groupList = require('./groupList')(coll);

    const dataUserGroup = require('./userGroup')(coll);

    Object.keys(groupList).forEach((groupName) => {
        const result = groupName !== 'other' ? dataUserGroup.filter((user) => user.data.user_group && user.data.user_group.includes(groupName)) : undefined;
        if (result) {
            memberByGroup.push({
                groupName,
                members: result
            });
        } else {
            memberByGroup.push({
                groupName: 'other',
                members: dataUserGroup.filter((user) => !user.data.user_group),
            });
        }
    });

    return memberByGroup.sort((a, b) => {
        if (a.groupName == 'other') return 1;
        if (b.groupName == 'other') return -1;

        if (a.groupName < b.groupName)
            return -1;
        if (a.groupName > b.groupName)
            return 1;
        return 0;
    })
};
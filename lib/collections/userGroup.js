module.exports = (coll) => {
    const userGroup = [...coll.getFilteredByTags('members')];

    return userGroup.reverse();
};

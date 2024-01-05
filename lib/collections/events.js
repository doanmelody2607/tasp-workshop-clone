module.exports = (coll) => {
    const events = [...coll.getFilteredByGlob('src/events/*.md')];

    return events.reverse();
};

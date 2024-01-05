const dataGroup = [
    {
        key: 'BE',
        name: 'BACK-END DEVELOPER'
    },
    {
        key: 'FE',
        name: 'FRONT-END DEVELOPER'
    },
    {
        key: 'PA',
        name: 'PROJECT ANALYS'
    },
    {
        key: 'DS',
        name: 'DESIGNER'
    },
    {
        key: 'TESTER',
        name: 'TESTER'
    },
]

module.exports = (string) => {
    const result = dataGroup.find((group) => group.key == string);
    return result ? result.name : 'Khác';
};
module.exports = {
    people: getPeople(),
    user: getUser(),
    items: getItems()
};

function getItems() {
    return [
        {id: 1, name: 'Item A'},
        {id: 2, name: 'Item B'}
    ];
}

function getPeople() {
    return [
        {id: 1, firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
        {id: 2, firstName: 'Antony', lastName: 'Budianto', age: 22, location: 'Indonesia'},
        {id: 3, firstName: 'Helen', lastName: 'Budianto', age: 21, location: 'New York'},
        {id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
        {id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
        {id: 6, firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
        {id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'},
        {id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22, location: 'Utah'}
    ];
}

function getUser() {
    return [
        {id: 1, username: 'antony', firstName: 'Antony', lastName: 'Budianto', password: 'test'},
        {id: 2, username: 'budi', firstName:'Budi', lastName: 'Carolina', password: 'test2'}
    ];
}

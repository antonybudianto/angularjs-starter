var peopleMock = (function () {
    return {
        getDummies: getDummies
    };

    function getDummies() {
        return [
            {id: 1, firstName: 'Antony'},
            {id: 2, firstName: 'Budianto'}
        ];
    }
})();

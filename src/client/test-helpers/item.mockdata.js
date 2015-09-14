var itemMock = (function () {
    return {
        getDummies: getDummies
    };

    function getDummies() {
        return [
            {id: 1, name: 'Chair'},
            {id: 2, name: 'Desk'}
        ];
    }
})();

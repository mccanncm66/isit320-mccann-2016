var myObject = {

    number1: 1,
    number2: 2,
    string1: 'string',

    add: function() {
        'use strict';
        return number1 + number2;
    },
    subtract: function() {
        'use strict';
        return number1 - number2;
    },
    multiply: function() {
        'use strict';
        return number1 * number2;
    }
};

module.exports = myObject;

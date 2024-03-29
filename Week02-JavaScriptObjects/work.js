var person = {
    firstName: 'George',
    lastName: 'Washington',
    fullName: function() {
        'use strict';
        return this.firstName + ' ' + this.lastName;
    }
};

var calculator = {
    operator01: -1,
    operator02: -1,
    add: function() {
        'use strict';
        return this.operator01 + this.operator02;
    },
    subtract: function() {
        'use strict';
        return this.operator01 - this.operator02;
    }
};

calculator.multiply = function() {
    'use strict';
    return this.operator01 * this.operator02;
};

function divider(title) {
    'use strict';
    console.log('====================================');
    console.log(title);
    console.log('====================================');
}

divider('Person');
console.log(person.firstName);
console.log(person.lastName);
console.log(person.fullName());

calculator.operator01 = person.firstName.length;
calculator.operator02 = person.lastName.length;

divider('Calculator');
console.log('operator01 =', calculator.operator01);
console.log('operator01 =', calculator.operator02);

console.log('Add: ' + calculator.add());
console.log('Subtract: ' + calculator.subtract());
console.log('Multiply: ' + calculator.multiply());

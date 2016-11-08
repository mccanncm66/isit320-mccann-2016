/**
 * @name Control
 */

var myModule = angular.module('myModule', ['ngRoute']);

var currentDoc = null;
var currentIndex = 0;

var queryController = myModule.controller('QueryController',
    function($scope, result) {
        'use strict';
        if (result.ok) {
            $scope.result = 'It worked';
            if (result.data) {
                text += '\n' + JSON.stringify(result.data, null, 4);
            }
        } else if (result.requestFailed) {
            $scope.result = JSON.stringify(result.requestFailed, null, 4);
        } else {
            $scope.result = result;
            if ($scope.result.docs) {
                currentDoc = $scope.result.docs;
                displayEditControls(currentDoc, currentIndex);
            } else {
                hideEditControls();
            }
        }

        $scope.docs = result.docs;
    });

function runQuery(query, $q) {
    'use strict';
    var defers = $q.defer();
    $.getJSON(query, function(json) {
        defers.resolve(json);
    }).fail(function(jqxhr, textStatus, error) {
        var response = JSON.parse(jqxhr.responseText);
        response.genericError = error;
        response.statusText = textStatus;
        defers.resolve({
            'requestFailed': response
        });
    });
    return defers.promise;
}

queryController.delete = function($q) {
    'use strict';
    return runQuery('/deleteDb', $q);
};

queryController.create = function($q) {
    'use strict';
    return runQuery('/createDb', $q);
};

queryController.statesBulk = function($q) {
    'use strict';
    return runQuery('/insertBulk?fileName=GameData.json', $q);
};

queryController.statesOneDoc = function($q) {
    'use strict';
    return runQuery('/insertFile?fileName=GameData.json&id=oneDoc', $q);
};

queryController.design = function($q) {
    'use strict';
    return runQuery('/designDoc', $q);
};

queryController.viewBulk = function($q) {
    'use strict';
    return runQuery('/viewBulk?designDoc=states&view=docBulk', $q);
};

queryController.readOne = function($q) {
    'use strict';
    return runQuery('/read?docName=npcData', $q);
};

queryController.viewOneDoc = function($q) {
    'use strict';
    return runQuery('/viewOneDoc?designDoc=states&view=docGamesDoc', $q);
};

queryController.viewQuestionOneDoc = function($q) {
    'use strict';
    return runQuery('/viewQuestionOneDoc?designDoc=states&view=docGameQuestionDoc', $q);
};

queryController.viewBulkAngular = function($q) {
    'use strict';
    return runQuery('/viewStateCapitalAngular?designDoc=states&view=docStateCapital', $q);
};

var nameController = myModule.controller('NameController', function($scope, databaseName, allDbs) {
    'use strict';
    $scope.databaseName = databaseName;
    $scope.allDbs = allDbs;
});

nameController.databaseName = function($q) {
    'use strict';
    return runQuery('/databaseName', $q);
};

nameController.allDbs = function($q) {
    'use strict';
    return runQuery('/listDb', $q);
};

myModule.config(function($routeProvider) {
    'use strict';
    $routeProvider.when('/databaseName', {
        templateUrl: 'templates/DatabaseNames.html',
        controller: 'NameController',
        resolve: {
            databaseName: nameController.databaseName,
            allDbs: nameController.allDbs
        }
    }).when('/deleteDb', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.delete
        }
    }).when('/createDb', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.create
        }
    }).when('/insertStatesBulk', {
        templateUrl: 'templates/States.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.statesBulk
        }
    }).when('/insertStatesOneDoc', {
        templateUrl: 'templates/States.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.statesOneDoc
        }
    }).when('/insertDesignDoc', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.design
        }
    }).when('/readOne', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.readOne
        }
    }).when('/viewBulk', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewBulk
        }
    }).when('/viewOneDoc', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewOneDoc
        }
    }).when('/viewBulkStatesCapital', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewBulkAngular
        }
    }).when('/viewQuestionOneDoc', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewQuestionOneDoc
        }
    }).otherwise({
        redirectTo: '/'
    });
});

/*var npcName = document.getElementById('npcName');
 var npcDescription = document.getElementById('npcDescription');
 var npcQuestion = document.getElementById('npcQuestion');*/

var displayEditControls = function(doc, index) {
    'use strict';
    var editControls = document.getElementById('editControls');
    if (index >= 0 && index < doc.length) {
        editControls.style.display = 'block';
        $('#npcName').val(doc[index].npc_name);
        $('#npcDescription').val(doc[index].description);
        $('#npcQuestion').val(doc[index].question);
    }
};

var hideEditControls = function() {
    'use strict';
    var editControls = document.getElementById('editControls');
    editControls.style.display = 'none';
};

var nextDoc = function() {
    'use strict';
    console.log('next clicked');
    if (currentIndex < currentDoc.length - 1) {
        ++currentIndex;
    }
    displayEditControls(currentDoc, currentIndex);
};

var backDoc = function() {
    'use strict';
    console.log('back clicked');
    if (currentIndex > 0) {
        --currentIndex;
    }
    displayEditControls(currentDoc, currentIndex);
};
/*
window.onload = function() {
   $.getJSON('/read?docName=3e82f91797ece19dcfa2285dde098e8e', function(result) {
       console.log(result);
   });
} */

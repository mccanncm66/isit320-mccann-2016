
define(['runQuery'], function (runQuery) {
    var queryController = function (query, result) {
        'use strict';
        var $scope = $('#debug');
        var docs = $('#docs');
        docs.empty();
        if (result.ok) {
            $scope.result = "It worked";
            $scope.stateList = result.data;
            docs.html('It worked');
        } else if (result.requestFailed) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.result = "Request Failed";
        } else if (result.error) {
            //YOUR CODE HERE  PUTS INFO IN $scope AND/OR docs
            $scope.result = 'Error!';
        } else {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.result = 'nothing happened';
        }

        //docs.html('YOUR CODE HERE PUTS INFO IN docs');
    };

    queryController.delete = function ($q) {
        'use strict';
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function ($q) {
        'use strict';
        return runQuery('/createDb', $q);
    };

    queryController.insertNpcsBulk = function ($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
    };

    queryController.insertStatesBulk = function($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=States.json', $q);

    }

    queryController.insertNpcsOneDoc = function ($q) {
        'use strict';
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.design = function ($q) {
        'use strict';
        return runQuery('/designDoc', $q);
    };

    queryController.readOne = function ($q) {
        'use strict';
        return runQuery('/read?docName=npcData', $q);
    };

    queryController.viewBulk = function ($q) {
        'use strict';
        return runQuery('/viewNpcsBulk?designDoc=game&view=npcsBulk', $q);
    };

    queryController.viewOneDoc = function ($q) {
        'use strict';
        return runQuery('/viewNpcsOneDoc?designDoc=game&view=npcsOneDoc', $q);
    };

    return queryController;
});
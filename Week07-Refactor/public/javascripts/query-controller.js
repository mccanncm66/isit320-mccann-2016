//var myModule = angular.module('myModule', ['ngRoute']);
define(function () {

    function queryController() {
        'use strict';
        if (result.ok) {
            $scope.result = "It worked";
            $scope.stateList = result.data;
        } else if (result.requestFailed) {
            $scope.result = JSON.stringify(result.requestFailed, null, 4);
        } else if (result.error) {
            $scope.result = result.error + ': ' + result.message;
        } else if (result.docs) {
            $scope.stateList = result.docs;
        } else if (result.rows) {
            $scope.stateList = result.rows;
        } else {
            $scope.result = result;
        }

        $scope.docs = JSON.stringify(result.docs, null, 4);
    }

    queryController.delete = function ($q) {
        'use strict';
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function ($q) {
        'use strict';
        return runQuery('/createDb', $q);
    };

    queryController.statesBulk = function ($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=States.json', $q);
    };

    queryController.statesOneDoc = function ($q) {
        'use strict';
        return runQuery('/insertFile?fileName=States.json&id=oneDoc', $q);
    };

    queryController.design = function ($q) {
        'use strict';
        return runQuery('/designDoc', $q);
    };

    queryController.viewBulk = function ($q) {
        'use strict';
        return runQuery('/viewBulk?designDoc=states&view=docBulk', $q);
    };

    queryController.readOne = function ($q) {
        'use strict';
        return runQuery('/read?docName=statesDoc', $q);
    };

    queryController.viewOneDoc = function ($q) {
        'use strict';
        return runQuery('/viewOneDoc?designDoc=states&view=docStatesDoc', $q);
    };

    queryController.viewBulkAngular = function ($q) {
        'use strict';
        return runQuery('/viewStateCapitalAngular?designDoc=states&view=docStateCapital', $q);
    };

    return queryController;
});
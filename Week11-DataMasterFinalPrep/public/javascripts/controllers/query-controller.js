define(['runQuery', 'utility'], function(runQuery, utility) {
    'use strict';
    var queryController = function(query, result) {

        utility.clearAll();
        if (query.requestFailed) {
            utility.failed(query.requestFailed);
            return;
        }
        //'use strict';
        var $scope = $('#debug');
        var docs = $('#docs');
        if(query.requestFailed) {
            utility.failed(query.requestFailed);
            return;
        }
        docs.empty();
        if (result.ok) {
            $scope.result = 'It worked';
            $scope.stateList = result.data;
            docs.html('It worked');
        } else if (result.requestFailed) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.result = 'Request Failed';
        } else if (result.error) {
            //YOUR CODE HERE  PUTS INFO IN $scope AND/OR docs
            $scope.result = 'Error!';
        } else if (result._id == 'npcData') {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            console.log(result);
            $scope.html = result._id;
            docs.html(JSON.stringify(result.docs, null, 4));
        } else {
            docs.html('ERROR!');
        }


        //docs.html('YOUR CODE HERE PUTS INFO IN docs');
    };

    queryController.delete = function($q) {
        //'use strict';
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function($q) {
        //'use strict';
        return runQuery('/createDb', $q);
    };

    queryController.insertGameData = function($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=GameData.json', $q);
    };

    queryController.insertStatesBulk = function($q) {
        //'use strict';
        return runQuery('/insertBulk?fileName=States.json', $q);
    };

    queryController.insertNpcsOneDoc = function($q) {
        //'use strict';
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.design = function($q) {
        //'use strict';
        return runQuery('/designDoc', $q);
    };

    queryController.readOne = function($q) {
        //'use strict';
        console.log('queryController.readOne called');
        console.log($q);
        return runQuery('/read?docName=npcData', $q);
    };

    queryController.viewBulk = function($q) {
        //'use strict';
        return runQuery('/viewNpcsBulk?designDoc=states&view=npcsBulk', $q);
    };

    queryController.viewOneDoc = function($q) {
        //'use strict';
        return runQuery('/viewNpcsOneDoc?designDoc=states&view=npcsOneDoc', $q);
    };

    return queryController;
});

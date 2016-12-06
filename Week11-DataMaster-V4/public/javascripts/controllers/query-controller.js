define(['runQuery', 'utils', 'jsonToHtml'], function(runQuery, utility, jsonToHtml) {
    'use strict';
    var currentIndex = 0;
    var currentDoc = null;

    var displayEditControls = function(doc, index) {
        'use strict';
        var editControls = document.getElementById('editControls');
        if (index >= 0 && index < doc.length) {
            editControls.style.display = 'block';
            $('#npcName').val(doc[index].name);
            $('#npcDescription').val(doc[index].id);
            $('#npcQuestion').val(doc[index].value);
        }
    };

    function getResult(result) {
        try {
            var output = result.data[0].result;
            return output;
        } catch (e) {
            //Do nothing
        }

    }

    function backDoc() {
        console.log('backdoc');
    }

    function nextDoc() {
        console.log('nextdoc');
    }

    var queryController = function(query, result) {
        //'use strict';
        $('#next').click(nextDoc);
        $('#back').click(backDoc);
        utility.clearAll();
        if (query.requestFailed) {
            utility.failed(query.requestFailed);
            return;
        } else {
            var $scope = $('#debug');
            var docs = $('#docs');
            docs.empty();
            console.log(result);
            console.log(result.total_rows);
            if (result.ok) {
                if (getResult(result) === 'Database created') {
                    docs.html('Database successfully created.');
                } else if (getResult(result) === 'Database deleted') {
                    docs.html('Database successfully deleted.');
                } else {
                    docs.html('Data Inserted');
                }
                //console.log(result.data[0].result);
                $scope.result = 'It worked';
                $scope.stateList = result.data;
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
                var oneDoc = JSON.stringify(result.docs, null, 4);
                var jsonHtmlTable = jsonToHtml(JSON.parse(oneDoc),
                    'jsonTable', 'table table-bordered table-striped', 'Download');
                $('#myTable').html(jsonHtmlTable);

            } else if (result.total_rows === 1) {
                $scope.result = result;
                currentDoc = $scope.result.rows[0].value;
                displayEditControls(currentDoc, currentIndex);
            }
            else {
                docs.html('ERROR!');
            }
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

    queryController.insertNpcsBulk = function($q) {
        //'use strict';
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
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

    queryController.viewBulk = function($q) { //*************************************************
        //'use strict';
        return runQuery('/viewOneDoc?designDoc=states&view=docGamesDoc', $q);
    };

    queryController.viewOneDoc = function($q) { //************************************************8
        //'use strict';
        return runQuery('/db-viewNpcsOneDoc?designDoc=states&view=docGameQuestionDoc', $q);
    };


    return queryController;
});

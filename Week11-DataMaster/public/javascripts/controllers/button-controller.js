define(['runQuery', 'utils', 'jsonToHtml'], function(runQuery, utility, jsonToHtml) {
    'use strict';
    var currentIndex = 0;
    var currentDoc = null;

    var displayEditControls = function(doc, index) {
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
        if (currentIndex !== 0) {
            currentIndex--;
            displayEditControls(currentDoc, currentIndex);
        }
    }

    function nextDoc() {
        console.log('nextdoc');
        if (currentIndex < currentDoc.length - 1) {
            currentIndex++;
            displayEditControls(currentDoc, currentIndex);
        }
    }

    var buttonController = function(query, result) {
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

            if (result.total_rows === 1) {
                $scope.result = result;
                currentDoc = $scope.result.rows[0].value;
                displayEditControls(currentDoc, currentIndex);
            } else {
                docs.html('ERROR!');
            }
        }
        //docs.html('YOUR CODE HERE PUTS INFO IN docs');
    };

    buttonController.viewBulk = function($q) { //*************************************************
        //'use strict';
        return runQuery('/viewOneDoc?designDoc=states&view=docGamesDoc', $q);
    };

    buttonController.viewOneDoc = function($q) { //************************************************8
        //'use strict';
        return runQuery('/db-viewNpcsOneDoc?designDoc=states&view=docGameQuestionDoc', $q);
    };

    return buttonController;
});

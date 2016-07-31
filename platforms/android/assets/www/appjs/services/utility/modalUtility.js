'use strict';

angular.module('cmaManagementApp')
    .factory('modalUtility', function (ngDialog, commonUtility, constantLoader) {
        
        var modalUtility = {};

        modalUtility.showConfirm = function(message, positiveText, negetiveText){
            
            positiveText = (commonUtility.is3DValidKey(positiveText))? 
                positiveText : constantLoader.defaultValues.CONFIRM_BOX_YES;
            negetiveText = (commonUtility.is3DValidKey(negetiveText))? 
                negetiveText : constantLoader.defaultValues.CONFIRM_BOX_NO;
            
            var nestedConfirmDialog = ngDialog.openConfirm({
                template:   '<p>' + message + '</p>' +
                            '<div class="ngdialog-buttons">' +
                                '<button type="button" class="ngdialog-button ngdialog-button-primary" ' +
                                    ' ng-click="confirm(1)">' + positiveText + '</button>' +
                                '<button type="button" class="ngdialog-button ngdialog-button-secondary" ' +
                                    'ng-click="closeThisDialog(0)">' + negetiveText + '</button>' +
                            '</div>',
                plain: true,
                closeByDocument: false
            });
            return nestedConfirmDialog;
        };
        
        return modalUtility;
    });

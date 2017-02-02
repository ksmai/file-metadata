'use strict';

exports.fileMetadata = function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/file-metadata-template.html',
    controller: 'fileMetadataCtrl'
  };
};

exports.fileInput = ['$parse',
  function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        element.on('change', function() {
          $parse(attr.fileInput).assign(scope, element[0].files[0]);
          scope.$apply();
        });
      }
    };
  }
];

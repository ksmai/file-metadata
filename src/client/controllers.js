'use strict';

exports.fileMetadataCtrl = ['$scope', '$http',
  function($scope, $http) {
    $scope.submit = function() {
      var fd = new FormData();
      fd.append('file', $scope.file);
      $http.post('/api/upload', fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      })
      .then(function(res) {
        if(!$scope.metadata || !Array.isArray($scope.metadata)) {
          $scope.metadata = [];
        }
        $scope.metadata.push({
          name: res.data.file.originalname,
          size: res.data.file.size,
          mime: res.data.file.mimetype,
          newName: res.data.file.filename
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    };
  }
];

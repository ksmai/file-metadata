'use strict';

describe('User interface', function() {
  var injector, scope, element, httpBackend;

  beforeEach(function() {
    injector = angular.injector(['file-metadata', 'ngMockE2E']);
    injector.invoke(function($rootScope, $compile, $httpBackend) {
      scope = $rootScope.$new();
      element = $compile('<file-metadata></file-metadata>')(scope);
      $httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
      httpBackend = $httpBackend;
      scope.$apply();
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('initializes correctly', function(done) {
    scope.$on('fileMetadataCtrl', function() {
      assert.equal( element.find('input').length, 1 );
      assert.equal( element.find('button').length, 1 );
      assert.equal( element.find('table').length, 1 );
      assert.equal( element.find('table.ng-hide').length, 1 );
      assert.equal( element.find('tr').length, 1 );
      done();
    });
  });

  it('displays responses properly', function(done) {
    const res = {
      file: {
        originalname: 'filename.ext',
        mimetype: 'somemimetype',
        filename: 'abcdefghijklmnopqrstuvwxyz',
        size: 123456
      }
    };
    scope.$on('fileMetadataCtrl', function() {
      const $button = element.find('button').eq(0);

      for(let i = 0; i < 10; i++) {
        httpBackend.expectPOST(/\/api\/upload/i).respond(res);
        $button.trigger('click');
        assert.equal( element.find('tr').length, i + 1 );
        httpBackend.flush();
        assert.equal( element.find('tr').length, i + 2 );
      }
      done();
    });
  });
});

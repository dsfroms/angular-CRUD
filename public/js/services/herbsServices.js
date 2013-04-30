angular.module('herbsServices').factory('Herb', function ($resource) {
    return $resource('/api/herb/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

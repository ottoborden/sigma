function UsersService($resource) {  
  /**
   * @name UsersService
   *
   * @description
   * A service providing game data.
   */

  var $ctrl = this;

  /**
   * A resource for retrieving game data.
   */
  $ctrl.UsersResource = $resource(_urlPrefixes.API + "users/:user_id/");

  /**
   * A convenience method for retrieving User objects.
   * Retrieval is done via a GET request to the ../users/ endpoint.
   * @param {object} params - the query string object used for a GET request to ../users/ endpoint
   * @returns {object} $promise - a promise containing user-related data
   */
  $ctrl.getUsers = function(params) {
    return $ctrl.UsersResource.query(params).$promise;
  };
}

angular.module("Users")  
  .service("UsersService", ["$resource", UsersService]);
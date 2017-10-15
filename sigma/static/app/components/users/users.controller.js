function UsersController(UsersService) {  
  var $ctrl = this;
  console.log(arguments);
  /* Stored game objects. */
  $ctrl.users = [];

  /**
   * Initialize the game list controller.
   */
  $ctrl.$onInit = function() {
    return UsersService.getUsers().then(function(users) {
      $ctrl.users = users;
    });
  };
}

angular.module("Users")  
  .controller("UsersController", [
    "UsersService",
    "api",
    UsersController
  ]);
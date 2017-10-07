function HomeController() {  
  var $ctrl = this;
  $ctrl.foo = "Foo!";
  console.log($ctrl); // should print out the controller object
}

angular.module("Home")  
  .controller("HomeController", [
    HomeController
  ]);
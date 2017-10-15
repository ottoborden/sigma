function HomeController(LocalAuth) {  
  var $ctrl = this;
  
  if (!LocalAuth.isAuthed) {
    $ctrl.isAuthed = false;
  } else {
    $ctrl.isAuthed = true;
  }


}

angular.module("Home")  
  .controller("HomeController", [
    "LocalAuth",
    HomeController
  ]);
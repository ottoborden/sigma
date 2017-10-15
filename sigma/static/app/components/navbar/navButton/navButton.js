function NavButtonController(/*$scope, $elem, $attrs*/UserStore) {
  var ctrl = this;

  console.log(ctrl);
  console.log(UserStore);

  ctrl.isAuthed = UserStore.isAuthed;
}

NavButtonController.$inject = ["UserStore"];

angular.module("NavButton", [])
  .component("navButton", {
    templateUrl: "static/app/components/navbar/navButton/button.html",
    controller: NavButtonController
  });
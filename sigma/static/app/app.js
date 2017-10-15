/* Libs */
require("angular/angular");  
require("angular-route/angular-route");  
require("angular-resource/angular-resource");
require("angular-cookies");

/* Globals */
_ = require("lodash");  
_urlPrefixes = {  
  API: "api/v1/",
  TEMPLATES: "static/app/"
};

/* Components */
require("./components/home/home");
require("./components/users/users");
require("./components/navbar/navButton/navButton");

/* App Dependencies */
angular.module("myApp", [  
  "Home",
  "Users",
  "NavButton",
  "ngResource",
  "ngRoute",
  "ngCookies"
]);

/* Resources */
require("./resources/api.factory");

/* Config Vars */
var routesConfig = require("./routes"); 

/* App Config */
angular.module("myApp")
  .config(routesConfig)
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  })
  .factory("LocalAuth", ["$cookies", function ($cookies) {
    return {
      user : {},

      getToken: function(tokenName) {
        var name = tokenName ? tokenName : "token";
        return $cookies.get(name);
      },

      set: function(tokenName, data) {
        // you can retrive a user setted from another page, like login sucessful page.
        var name = tokenName ? tokenName : "token";
        var existing_cookie_value = $cookies.get(name);
        var val = data || existing_cookie_value;
        $cookies.put(name, val);
      },

      remove: function(tokenName) {
        var name = tokenName ? tokenName : "token";
        $cookies.remove(name);
      }
    };
  }])
  .service("UserStore", function() {
    return {
      isAuthed: false
    };
  })
  .run(["authApi", "LocalAuth", "UserStore", function(authApi, LocalAuth, UserStore) {
    var token = LocalAuth.getToken();

    // Determine if there is a token
    // If there is hit the API and get the associated user, else set unauthed
    if (!token) {
      UserStore.isAuthed = false;
    } else {
      console.log(authApi);
      // authApi.auth.isAuthed();
    }
  }]);
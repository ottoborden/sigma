angular.module("myApp")
  .factory("authApi", function($resource) {
    function add_auth_header(data, headersGetter) {
      // as per HTTP authentication spec [1], credentials must be
      // encoded in base64. Lets use window.btoa [2]
      var headers = headersGetter();
      headers["Authorization"] = ("Basic " + btoa(data.username +
                    ":" + data.password));
    }
    // defining the endpoints. Note we escape url trailing dashes: Angular
    // strips unescaped trailing slashes. Problem as Django redirects urls
    // not ending in slashes to url that ends in slash for SEO reasons, unless
    // we tell Django not to [3]. This is a problem as the POST data cannot
    // be sent with the redirect. So we want Angular to not strip the slashes!
    return {
      auth: $resource(_urlPrefixes.API + "auth\\/", {}, {
        isAuthed: {method: "GET", transformRequest: add_auth_header},
        login: {method: "POST", transformRequest: add_auth_header},
        logout: {method: "DELETE"}
      }),
      users: $resource(_urlPrefixes.API + "users\\/", {}, {
        create: {method: "POST"}
      })
    };
  });
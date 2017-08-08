var route = Rlite(notFound, {
  // Default route
  '': function () {
    nx.importController('index', function() {
      indexController.index();
    });
  },

  // #inbox
  'inbox': function () {
    nx.importController('inbox', function() {
      inboxController.index();
    });
  },

  // #sent?to=john -> r.params.to will equal 'john'
  'login': function ({to}) {
    nx.importController('auth', function() {
      authController.login();
    });
  },

  // #users/chris -> r.params.name will equal 'chris'
  'users/:name': function ({name}) {
    return 'User ' + name;
  },

  // #logout
  'logout': function () {
    return 'Logout';
  }
});

function notFound() {
  return '<h1>404 Not found :/</h1>';
}

// Hash-based routing
function processHash() {
  var hash = location.hash || '#';

  // Do something useful with the result of the route
  // document.body.textContent = route(hash.slice(1));
  route(hash.slice(1));
}

window.addEventListener('hashchange', processHash);
processHash();
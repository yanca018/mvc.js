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
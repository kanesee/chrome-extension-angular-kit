app.service('tabModel', function ($q) {
  var _this = this;
  this.data = [];

  this.getUrl = function(callback) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}
                      , function(tabs) { callback(tabs); })
  }


});
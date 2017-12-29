var bgapp = angular.module('BackgroundApp', []);

bgapp.controller('BackgroundCtrl',
  ['$http',
  controllerFn]);

function controllerFn($http) {
  var self = this;
  
 var site = 'kodingnotes.wordpress.com';
  
  var captures = {};
  
  this.registerBodyCapture = function() {
    chrome.webRequest.onBeforeRequest.addListener(function(details){
      if( details.url.match(site) ) {
        if( details.requestBody ) {
          var postedString = decodeURIComponent(String.fromCharCode.apply(null,
                                      new Uint8Array(details.requestBody.raw[0].bytes)));
          console.log('body: '+postedString);
        }
      }
    },
    {urls: [ "<all_urls>" ]},['requestBody']);     
  }
  
  this.registerHeaderCapture = function() {
    /**********************************************************
     * Monitors for interesting sites. When found, wakes up
     * extension and passes the headers to it.
     *
     * {permissions:webRequestBlocking} are required in manifests
     * as well as 'blocking' in the extraInfoSpec array below in order
     * to modify request headers. An object with requestHeaders should
     * be returned with new set of headers
     **********************************************************/
    chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
      var blockingResponse = {};

      if( details.url.match(site) ) {
//        console.log('headers: ' + JSON.stringify(details));
        
        if( details.tabId > -1 ) {
          chrome.pageAction.show(details.tabId);
//          chrome.tabs.sendMessage(details.tabId, {details: details});
        }

      }

      return blockingResponse;
    },
    {urls: [ "<all_urls>" ]},['requestHeaders','blocking']);    
  }
  
  
  this.init = function() {
    console.log('init background-ng.js');

    self.registerBodyCapture();
    self.registerHeaderCapture();
    
  }
  
  this.init();
}
                
  

/**
 * @typedef notificationMessg
 * @type {object}
 * @property {string} type - type of message
 * @property {string} title - title of message
 * @property {number} message - content of message
 * @property {number} iconUrl - icon URL for message
 */
 var notificationMessg= {
  type: "basic",
  title: "Phishing Detected",
  message: "[WARNING!!!] Phishing Detected",
  iconUrl: "warning.png"
}
/**
* Represents a function sleep.
* @function
* @constructor
* @param {any} milliseconds - Pauses execution time in ms
*/
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

chrome.notifications.create(notificationMessg, callback);
/**
* Represents a function callback, that will be called when prediction is =1 
* @name callback
* @function
**/
function callback(){
  console.log('true IT is phishing!\n');
}
/**
* Represents a function chrome.runtime.onMessage.addListener.
* @function 
* @name chrome.runtime.onMessage.addListener
* @callback callback
* @param {any} prediction - It is variable that contains in logic2.js function predict(testdata)
* @param {any} sender - An object containing information about the script context that sent a message or request
* @param {any} sendResponse - {} function. The sendResponse parameter looks like: () => void
*/

/**
* Does something asynchronously and executes the callback on completion.
* @param {callback} cb - The callback that handles the response.
*/
chrome.runtime.onMessage.addListener(
  function(prediction, sender, sendResponse){
      console.log("the sender is: ",sender);
      console.log("the sendResponse is: ",JSON.stringify(sendResponse));
  if (prediction == 1){  
    /**
    * Represents a function chrome.notifications.create, that creates a notification, first argument is variable notificationMesg
    * that contains given element of message and second arguments is callback, that will be called when is created notification
    * @function
    * @param {var} notificationMessg - 1st argument represents var, that we've created with specific metadata
    * @param {var} callback - 2nd argument represents callback function, that will inform us that was phishing URL address
    */
      chrome.notifications.create(notificationMessg, callback);
      alert("Warning: Phishing detected!!");
      sleep(1000);
      console.log("TRU\n");
    /**
    * Represents a function chrome.runtime.onMessage.removeListener, that removes created EventListener
    * @function
    * @param {var} prediction
    */ 
      chrome.runtime.onMessage.removeListener(prediction);
      console.log("Removed\n");
  }
  else if (prediction == -1){
      alert("No phishing detected");
      sleep(1000);
      console.log("TRU\n");
    /**
    * Represents a function chrome.runtime.onMessage.removeListener, that removes created EventListener
    * @function
    * @param {var} prediction
    */
      chrome.runtime.onMessage.removeListener(prediction);
      console.log("Removed\n");

  }
});
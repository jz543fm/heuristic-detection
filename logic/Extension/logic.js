/*
Extension that can detect phishing URL addresses by 
preddefined heuristic rules.

The functionality is given: 

The main configuration file for the extenstion is file manifest.json.

In manifest.json we're setting up the manifest version that we're using
name and the description of the web browser extension, image for the proper
icon of the web browser extenion. The background script definition is neededed
to register in manifest file, because that script tells the web browser extension
to which file we're referencing and how that file should behave.

In the background script the extensionListener.js we're defying the 
*/
/**
 * Represents a function predict2(data,weight)
 * @function
 * @constructor
 * @param {any} data - 1st parameter that represents testdata, array of functions
 * @param {any} weight - 2nd paramaeter that represents the values for proper function
 */
 function predict(data, weight){
    var f = 0;
    /**
    * Represents a array of floating point values for every proper heuristic fuction, that will be taken into calculation 
    * return value is f.
    * @type {array}
    */
    weight = [3.33346292e-01,3.33346292e-01,4.5555555e-01,5.5555555e-01,-1.11200396e-01,-7.77821806e-01,1.11058590e-01,3.89430647e-01,1.99992062e+00,4.44366975e-01,-2.77951957e-01,-6.00531647e-05,3.33200243e-01,2.66644002e+00,6.66735991e-01,5.55496098e-01,5.57022408e-02,2.22225591e-01,-1.66678858e-01];
    /**
    * Returns the sum of all numbers passed to the function.
    * @param {...number} num A positive or negative number
     */
    for(var j=0;j<data.length;j++) {
    //  f += data[j] * weight[j];
    f = f + (data[j] * weight[j]);
      /*
        Print the value, how is calculated to the console.
      */
      console.log("Calculating the f is = \n", f, "where actual weight is: ", weight[j]);
      console.log("where actual data is: ", data[j]);
    }

    var myJsonString = JSON.stringify(f);
    localStorage.setItem("myJsonString", myJsonString); //store myJsonString
    console.log("The final value of f is  = \n", f);
    
    return f > 0 ? 1 : -1;
   // return null;
}
/**
 * Represents function isIPv4(), if URL contains IPV4 address
 * @name isIPv4
 * @function
 **/
function isIPv4(){

    console.log("This is the web browser extension that can determine by heuristic rules if there is a phishing URL address or not! \n")
    console.log("In the console, file logic.js prints by the specific function additional status messages about every specific heuristic rule\n");
    console.log("Then is calculated weight. Weight is defined in float treshold value for every specific heuristic rule\n");

    var reg =/\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
    var url = window.location.href
    if(reg.exec(url)==null){
        console.log("\t[INFO] No IPv4 address in URL address was found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("\t[ERROR] IPv4 address in the URL address was found\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 1
// IPV4
/**
 * Represents function isHttps(), if URL address contains https protocol
 * @name isHttps
 * @function
 **/
function isHttps(){
    var reg =/http:\/\//;
    var url = window.location.href
    //console.log("The url address that we are getting is... ", url);
    if(reg.exec(url)==null){
        console.log("\t[INFO] HTTPS in URL address was found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("\t[ERROR] HTTP in the URL address was found\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 2
// HTTPS
/**
 * Represents function isTildeInURL(), if URL address contains tilde symbol
 * @name isTildeInURL
 * @function
 **/
function isTildeInURL(){
    var search ="~";
    var url = window.location.href; 
    if(url.match(search)==null){
        console.log("\t[INFO] Symbol '~' in URL address was not found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("\t[ERROR] Symbol '~' in URL address was found\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 3
// ~
/**
 * Represents function isHashTaginURL(), if URL address contains hashtag symbol
 * @name isHashTaginURL
 * @function
 **/
function isHashTaginURL(){
    var search ="#";
    var url = window.location.href; 
    if(url.match(search)==null){
        console.log("\t[INFO] Symbol '#' in URL address was not found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("\t[ERROR] Symbol '#' in URL address was found\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 4
// #
/**
 * Represents function isHashTaginURL(), if URL address is long or short by specific integer values
 * @name isLongURL
 * @function
 **/
function isLongURL(){
    var url = window.location.href;    
    if(url.length<54){
        console.log("\t[INFO] The URL address is shorter than 54 chars\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 
    else if(url.length>=54 && url.length<=75){
        console.log("\t[INFO] The URL is bigger than 54 chars and shorter than 75 chars\n");
        console.log("+/- MAYBE POSITIVE\n");
        return 0;
    }
    else{
        console.log("\t[ERROR] URL is bigger than 75 chars\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 5
// <54
/**
 * Represents function isTinyURL(), if URL address is too short by specific integer values
 * @name isTinyURL
 * @function
 **/
function isTinyURL(){
    var url = window.location.href;    
    if(url.length>20){
        console.log("\t[INFO] The URL address is bigger than 20 chars\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 
    else{
        console.log("\t[ERROR] URL is shorter than 20 chars\n");
        console.log("+ POSITIVE");
        return 1;
    }
}
/*6*/
// <20
/**
 * Represents function isAlphaNumericURL(), if URL address contains @ symbol
 * @name isAlphaNumericURL
 * @function
 **/
function isAlphaNumericURL(){
    var search ="@";
    var url = window.location.href; 
    if(url.match(search)==null){
        console.log("\t[INFO] Symbol '@' in URL address was not found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    if(url.match(search)!=null){
        console.log("\t[ERROR] Symbol '@' in URL address was not found\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 7
// Alphan
/**
 * Represents function isRedirectingURL(), if URL address is redirecting and counts occurencences
 * @name isRedirectingURL
 * @function 
 **/
function isRedirectingURL(){
    console.log("\t[INFO] Verifying if URL address is redirecting\n");
    var reg1 = /^http:/
    var reg2 = /^https:/
    var count_slash ="//";
    var url = window.location.href; 
    if(url.search(count_slash)==5 && reg1.exec(url)!=null && (url.substring(7)).match(count_slash)==null){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else if(url.search(count_slash)==6 && reg2.exec(url)!=null && (url.substring(8)).match(count_slash)==null){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("\t[ERROR] The URL address is redirecting to another website\n");
        console.log("+ POSITIVE");
        return 1;
    }
}
// 8
// Redir
/**
 * Represents function isHypenURL(), if URL address contains hyphen and if the URL contains more than counter is preddefined by integer value 5
 * @name isHypenURL
 * @function 
 **/
function isHypenURL(){
    var reg = /[a-zA-Z]\//;
    var srch ="-";
  /*  if(((url.substring(0,url.search(reg)+1)).match(srch))==null){
        console.log("Printing the url address",url.substring(0,url.search(reg)+1));
        console.log("\t[INFO] Symbol '-' in URL address was not found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }    
    else{
        console.log("\t[ERROR] Symbol '-' in URL address was found\n");
        console.log("+ POSITIVE");
        return 1;
    }
*/
    console.log("\t[INFO] Verifying if URL address contains the - symbol and prints count\n");
    var search ="-";
    var url = window.location.href; 
    var counter =(url.match(/-/g)|| [].length);
    console.log("Counter for the - is :", counter.length, "\n");
    if(url.match(search)==null){
        console.log("\t[INFO] Symbol '-' in URL address was not found\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    if(counter.length>=5){
        console.log("\t[ERROR] Symbol '-' in URL address was found and counter is bigger or equal to 5\n");
        return 1;
    }
    else{
        console.log("\t[ERROR] Symbol '-' in URL address was found\n");
        console.log("+ POSITIVE\n");
        return 1;
    }
}
// 9
// Hyphen
/**
 * Represents function isMultiDomainURL(), if URL address contains multidomains and if counter, that counts multidomains is lower than preddefined value 5, URL address is positive
 * @name isMultiDomainURL
 * @function
 **/
function isMultiDomainURL(){
    var reg = /[a-zA-Z]\//;
    /*
    https://regexr.com/
    */
    var url = window.location.href;     
    if((url.substring(0,url.search(reg)+1)).split('.').length < 5){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }    
    else{
        console.log("+ POSITIVE");
        return 1;
    }
}
// 10
// Multidomain
/**
 * Represents function isFaviconDomainUnidentical(), if URL address contains favicon of domain identical
 * @name isFaviconDomainUnidentical
 * @function
 **/
function isFaviconDomainUnidentical(){
    var reg = /[a-zA-Z]\//;
    /*
    https://regexr.com/
    */
    var url = window.location.href; 
    if(document.querySelectorAll("link[rel*='shortcut icon']").length>0){            
        var faviconurl = document.querySelectorAll("link[rel*='shortcut icon']")[0].href;
        if((url.substring(0,url.search(reg)+1))==(faviconurl.substring(0,faviconurl.search(reg)+1))){
            console.log("- NEGATIVE POSITIVE\n");
            return -1;
        }    
        else{
            console.log("+ POSITIVE");
            return 1;
        }
    }
    else{
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
}
// 11
// FaviconDomain
/**
 * Represents function isIllegalHttpsURL(), if URL address contains illegal https
 * @name isIllegalHttpsURL
 * @function
 **/
function isIllegalHttpsURL(){
    console.log("Verify if this is an illegall https URL address");
    var srch1 ="//";   
    var srch2 = "https";   
    var url = window.location.href; 
    console.log("The url address that we are getting is... ", url);
    if(((url.substring(url.search(srch1))).match(srch2))==null){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }    
    else{
        console.log("+ POSITIVE");
        return 1;
    }
}
// 12
// IllegalHttps
/**
 * 
 * Represents function isImgFromDifferentDomain(), if URL address contains image from different domain
 * @name isImgFromDifferentDomain
 * @function
 **/
function isImgFromDifferentDomain(){
	var totalCount = document.querySelectorAll("img").length;
	var identicalCount = getIdenticalDomainCount("img");
	if(((totalCount-identicalCount)/totalCount)<0.22){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 
	else if((((totalCount-identicalCount)/totalCount)>=0.22) && (((totalCount-identicalCount)/totalCount)<=0.61)){
        console.log("+/- MAYBE POSITIVE\n");
        return 0;
    } 	
    else{
        console.log("+ POSITIVE");
        return 1;
    }
}
// 13
// ImageDomain
/**
 * Represents function isAnchorFromDifferentDomain(), if URL address contains anchor from different domain
 * @name isAnchorFromDifferentDomain
 * @function
 **/
function isAnchorFromDifferentDomain(){
	var totalCount = document.querySelectorAll("a").length
	var identicalCount = getIdenticalDomainCount("a");
	if(((totalCount-identicalCount)/totalCount)<0.31){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 
	else if((((totalCount-identicalCount)/totalCount)>=0.31) && (((totalCount-identicalCount)/totalCount)<=0.67)){
        console.log("+/- MAYBE POSITIVE\n");
        return 0;
    } 	
    else{
        console.log("+ POSITIVE");
        return 1;
    }
}
// 14
// A
/**
 * Represents function isScLnkFromDifferentDomain(), if URL address contains script from different domain
 * @name isScLnkFromDifferentDomain
 * @function
 **/
function isScLnkFromDifferentDomain(){
	var totalCount = document.querySelectorAll("script").length + document.querySelectorAll("link").length
	var identicalCount = getIdenticalDomainCount("script") + getIdenticalDomainCount("link");
	if(((totalCount-identicalCount)/totalCount)<0.17){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 
	else if((((totalCount-identicalCount)/totalCount)>=0.17) && (((totalCount-identicalCount)/totalCount)<=0.81)){
        console.log("+/- MAYBE POSITIVE\n");
        return 0;
    } 	
    else{
        console.log("+ POSITIVE");
        return 1;
    }
}
// 15
// Scripts
/**
 * Represents function isFormActionInvalid(), if URL address contains form on proper page and if given form is valid
 * @name isFormActionInvalid
 * @function
 **/
function isFormActionInvalid(){
    var totalCount = document.querySelectorAll("form").length
	var identicalCount = getIdenticalDomainCount("form");
	if(document.querySelectorAll('form[action]').length<=0){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
	}	
	else if(identicalCount!=totalCount){
        console.log("+/- MAYBE POSITIVE\n");
        return 0;
    } 	
    else if(document.querySelectorAll('form[action*=""]').length>0){
        console.log("+ POSITIVE");
        return 1;
    } 
    else{
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 
}
// 16
// FormActionValid
/**
 * Represents function isMailToAvailable(), if URL address contains mailto element
 * @name isMailToAvailable
 * @function
 **/
function isMailToAvailable(){
    if(document.querySelectorAll('a[href^=mailto]').length<=0){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    } 	
    else{
        console.log("+ POSITIVE");
        return 1;
    }
}
// 17
// MailTo
/**
 * Represents function isStatusBarTampered(), if URL address contains OnMouseOverEvent, On Mouse Over Event is mentioned in thesis
 * @name isStatusBarTampered
 * @function
 **/
function isStatusBarTampered(){
    if((document.querySelectorAll("a[onmouseover*='window.status']").length<=0) || (document.querySelectorAll("a[onclick*='location.href']").length<=0)){
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("+ POSITIVE");
        return 1;
    } 
}
// 18
// StatusBarTempered
/**
 * Represents function isIframePresent(), if URL address contains iframe element
 * @name isIframePresent
 * @function
 **/
function isIframePresent(){
    if(document.querySelectorAll('iframe').length<=0){
        console.log("\t[INFO] No iFrame present in the URL address\n");
        console.log("- NEGATIVE POSITIVE\n");
        return -1;
    }
    else{
        console.log("\t[ERROR] iFrame is present in the URL address\n");
        console.log("+ POSITIVE");
        return 1;
    }
}
// 19
// isIframePresent
/**
 * Represents function getIdenticalDomainCount(), URL address gets identical domain count in this fuction of form, tag "a", images or scripts
 * @name getIdenticalDomainCount
 * @function
 * @param {any} data 
 **/
function getIdenticalDomainCount(tag){    
    var i;
	var identicalCount=0;
	var reg = /[a-zA-Z]\//;    
    var url = window.location.href;
    var mainDomain = url.substring(0,url.search(reg)+1);    
    var nodeList = document.querySelectorAll(tag);
    if(tag=="img" || tag=="script"){
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].src
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }   
      });
    }  
    else if(tag=="form"){
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].action
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }   
      });
    }  
    else if(tag=="a"){
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].href
        if((mainDomain==(i.substring(0,i.search(reg)+1))) && ((i.substring(0,i.search(reg)+1))!=null) && ((i.substring(0,i.search(reg)+1))!="")){
           identicalCount++;
        }    
      });
    } 
    else{
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].href
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }    
      });
    }  
    return identicalCount;
} 
// 20
// getIdenticalDomainCount
/**
 * @param {Array.<Object>} testdata
 */
var testdata = [isIPv4(),isHttps(),isTildeInURL(),isHashTaginURL(),isLongURL(),isTinyURL(),isAlphaNumericURL(),isRedirectingURL(),isHypenURL(),isMultiDomainURL(),isFaviconDomainUnidentical(),isIllegalHttpsURL(),isImgFromDifferentDomain(),isAnchorFromDifferentDomain(),isScLnkFromDifferentDomain(),isFormActionInvalid(),isMailToAvailable(),isStatusBarTampered(),isIframePresent()];

var myJsonString = JSON.stringify(testdata);

localStorage.setItem("myJsonString", myJsonString); //store myJsonString

var testdata2 = testdata; 
var testdata2 = chrome.storage.local;
var v1 = 'k1';
var obj= {};
obj[v1] = 's1';
testdata2.set(obj);
testdata2.get(v1,function(result){
    console.log(v1,result);
    //console output = k1 {v1:'s1'}
  });
  
testdata2.get('v1',function(result){
    console.log(result);
    //console output = {v1:'s1'}
})

chrome.storage.sync.set({key: testdata}, function() {
    testdata.join('\r\n\n');
    console.log('Value is set to: ' + testdata);
  });
  
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is set to: ' + result.key);
  });
  
  chrome.storage.local.set({key: testdata}, function() {
    console.log('Value is set to ' + testdata);
  });

  chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });

var prediction = predict(testdata);

/**
 * Represents a function chrome.runtime.sendMessage
 * @function 
 * @name chrome.runtime.sendMessage
 * @param {any} prediction 
 */

chrome.runtime.sendMessage(prediction);
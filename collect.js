var factoids = [];

console.log("in collect.js");

function selectionOnClick (info, tab) {
       alert("selected - "+JSON.stringify(info));
    console.log("[collect] received selection : "+ info.selectionText+
		", from URL "+ info.pageUrl);
    console.log("[collect] stringified info :"+JSON.stringify(info));
    factoids.push(info);
    console.log("factoid array - "+JSON.stringify(factoids));
}

console.log("in collect listener");
chrome.contextMenus.create({title: "Olympic Factoid", 
	    contexts:["selection"], 
	    onclick: selectionOnClick});

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log("[collect.js] in onMessage listener - method = "+message.method);

	if(message.method == "getFactoid"){
	    //depending on how the word is stored you can do this in one of several ways
	    // 1. If it is a global variable, we can just return it directly
	    console.log("[collect.js] - sending a response to popup.js");

	    sendResponse(factoids);
	    // 2. It needs to be retrieved asynchronously, in that case we do this
	    //	    getWord(sendResponse);

	    return true;

	    // This passes the ability to reply to the function where we get the info
	    // Once we have the info we can just use sendResponse(word); like before
	}

	if (message.method == "clearFactoids") {
	    factoids = [];
	}
    });
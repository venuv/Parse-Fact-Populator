//console.log("in content.js");
//alert("content.js");

var port = chrome.runtime.connect({name: "knockknock"});
/*
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
	console.log("content script hears - "+msg.question);
	if (msg.question == "Who's there?")
	    port.postMessage({answer: "Madame"});
	else if (msg.question == "Madame who?")
	    port.postMessage({answer: "Madame... Bovary"});
    });
*/

function linkOnClick (info, tab) {
    port.postMessage({link: info.linkUrl});
}

function selectionOnClick (info, tab) {
    port.postMessage({selection: info.selectionText});
}

var contexts = ["selection","link"];
var title = "bad value";
var id; //id of contextMenu
for (var i=0;i<contexts.length;i++) {
    var context = contexts[i];
    if (context=="selection") {
	title = "SO Factoid";
	console.log("context = "+context);
	/*
	id = chrome.contextMenus.create({"title":title, "contexts":[context],
					 "onclick":selectionOnClick});
	*/
    }
    else if (context=="link") {
	title = "SO Link";

	/*
	id = chrome.contextMenus.create({"title":title, "contexts":[context],
					 "onclick":linkOnClick});
	*/
    }


}


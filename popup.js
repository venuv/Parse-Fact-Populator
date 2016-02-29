//

// these variables are used in SO data collection
    var n=1;
    var combo,combo_tag;
    var pel;
    var label, label_text;
    var option;
    var factoid_base= document.getElementById('factoids');


/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

}


function parsePost(e) {
    //   alert("parsePost");

   // get Sport info 
   var sport_sel = document.getElementById("Sport");
   var Sport = sport_sel.options[sport_sel.selectedIndex].value;


   // get Url info
   //   var url_value = document.getElementById("url").innerHTML;
   var url_value;

   // loop thru id's upto N and get Factoid info - both measure & value
   var serverUrl = 'https://api.parse.com/1/classes/sportfacts';

   var elt;
   for (i=1;i<n;i++) {
       var xmlhttp = new XMLHttpRequest();
       xmlhttp.onload = function() {
	   if (xmlhttp.status === 200 || xmlhttp.status === 201 || xmlhttp.status === 202) {
	       //need to clear out the form with Factoid elements here
	   }
	   else {
	       //	       alert("status -"+xmlhttp.status);
	       //	       alert("Boo -"+xmlhttp.responseText);
	   }
       };

       xmlhttp.open("POST", serverUrl,true);
       xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       xmlhttp.setRequestHeader("X-Parse-Application-Id", <Parse-App-Id>);
       xmlhttp.setRequestHeader("X-Parse-REST-API-Key", <Parse-REST-API-Key>);

       var fact_sel = document.getElementById("tag"+i.toString());
       var fact = fact_sel.options[fact_sel.selectedIndex].value;
       elt = document.getElementById('input'+i.toString()).value;

       url_value = document.getElementById('sourceurl'+i.toString()).innerHTML;

       // write to console.log
       console.log("sport ="+Sport+
		   ",url="+ 
		   url_value+
		   ","+fact+"="+elt);

       xmlhttp.send(JSON.stringify({"sport":Sport, 
		       "measure":fact,
		       "value":elt,
		       "url":url_value}));
   }

   // automatically clear out the 'form' elements
   factoid_base= document.getElementById('factoids');
   while (factoid_base.firstChild) {
       factoid_base.removeChild(factoid_base.firstChild);
   }
   n=1;

   chrome.runtime.sendMessage({method:"clearFactoids"},function(response){
	   console.log("cleared factoids");
       })

       //  alert("parsePost done");
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', parsePost);
    });


document.addEventListener('DOMContentLoaded', function() {
	//deactivate image search
    });


function addFactoid(string_val,string_url) {
     factoid_base= document.getElementById('factoids');

     label_text = "Factoid"+n.toString()+"        ";
     label = document.createElement("label");
     label.innerHTML = label_text;
     factoid_base.appendChild(label);
      
     url_label_text = "SourceUrl"+n.toString()+": "+string_url;
     url_label = document.createElement("cite");
     url_label.id = "sourceurl"+n.toString()
     url_label.innerHTML = string_url;
     factoid_base.appendChild(url_label);

     combo_tag = "tag"+n.toString();
     label.htmlFor=combo_tag;     
     combo = document.createElement("select");
     combo.id =  combo_tag;
     combo.name = combo_tag;

     option = document.createElement("option");
     option.text = "origin_yr";
     combo.add(option);
     option = document.createElement("option");
     option.text = "first_olympic_yr";
     combo.add(option);
     option = document.createElement("option");
     option.text = "pro_league";
     combo.add(option);
     option = document.createElement("option");
     option.text = "top_salary";
     combo.add(option);
     option = document.createElement("option");
     option.text = "global_player_cnt";
     combo.add(option);
     option = document.createElement("option");
     option.text = "play_frequency";
     combo.add(option);
     option = document.createElement("option");
     option.text = "other";
     combo.add(option);


     var input_name = "input"+n.toString();
     var input = document.createElement("input");
     input.setAttribute('id', input_name);
     input.setAttribute('value', string_val);

     factoid_base.appendChild(combo);
     factoid_base.appendChild(input);
     factoid_base.appendChild(document.createElement("br"));


     n++;
    }

    function addSport() {
     factoid_base= document.getElementById('factoids');

     label_text = "Pick a Sport:";
     label = document.createElement("label");
     label.innerHTML = label_text;
     label.htmlFor = label_text;
     factoid_base.appendChild(label);

     combo_tag = "Sport";
     label.htmlFor=combo_tag;     
     combo = document.createElement("select");
     combo.id =  combo_tag;
     combo.name = combo_tag;

     option = document.createElement("option");
     option.text = "Archery";
     combo.add(option);
     option = document.createElement("option");
     option.text = "Athletics";
     combo.add(option);
     option = document.createElement("option");
     option.text = "Badminton";
     combo.add(option);
     option = document.createElement("option");
     option.text = "Basketball";
     combo.add(option);


     option = document.createElement("option");
     option.text = "Beach Volleyball";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Boxing";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Canoe Slalom";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Canoe Sprint";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Cycling";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Cycling BMX";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Cycling Mountain Bike";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Cycling Road";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Cycling Track";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Diving";
     combo.add(option);


     option = document.createElement("option");
     option.text = "Equestrian Dressage";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Equestrian Eventing";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Equestrian Jumping";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Fencing";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Football";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Field Hockey";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Golf";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Gymnastics Artistic";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Gymnastics Rhythmic";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Gymnastics";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Handball";
     combo.add(option);


     option = document.createElement("option");
     option.text = "Hockey";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Judo";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Modern Pentathlon";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Rowing";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Rugby";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Sailing";
     combo.add(option);


     option = document.createElement("option");
     option.text = "Shooting";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Pistol";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Rifle";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Swimming";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Synchronized Swimming";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Table Tennis";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Taekwondo";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Tennis";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Trampoline";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Triathlon";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Volleyball";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Water Polo";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Weightlifting";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Wrestling";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Wrestling Freestyle";
     combo.add(option);

     option = document.createElement("option");
     option.text = "Wrestling Greco-Roman";
     combo.add(option);

     factoid_base.appendChild(combo);
     factoid_base.appendChild(document.createElement("br"));
    }


chrome.runtime.sendMessage({method:"getFactoid"},function(response){
	console.log("[popup.js] sendMessage");
	console.log(response);

	if (response.length ==0) return;

	addSport();

	for (i=0;i<response.length;i++) {
	    addFactoid(response[i].selectionText,response[i].pageUrl);
	}

    });


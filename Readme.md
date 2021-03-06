# Parse Fact Populator

#### Summary

*Parse populator* is a combination of  page and browser plug-ins that enables the scraping of content from web pages and publishing to Facebook's Parse BaaS (backend-as-service).
The code as published supports a schema to publish sports facts (sport name with attr/value pairs such as origin year) to Parse. However, the code that binds schema to GUI can be customized to support any facts interface to Parse. 

**Note** - you will need to provide Parse Application and REST API endpoints for this code to work

#### Architecture
 - The architecture uses standard message passing patterns within the Chrome Extension model as outlined in https://developer.chrome.com/extensions/messaging. 
 - The specific parse populator architecture (with data structures and message passing) is at (http://i.imgur.com/3u6Jhlz.jpg?1)

#### User Experience
 - first pick fact(s) that you want to include in Parse by marking them and picking the Olympic Factoid **page** menu item
 - when you're done picking the fact set, go to the **browser** plugin and click to POST to Parse. 
 - the POST also clears the facts array so you can repeat
 
#### Customization
 - change context menu to match new vocabulary
 - add new sendMessage to request new content types
 - add new messageListeners to provide new content types
 - change the addFactoid code to change the form  that is being posted
 - Form schema would evolve to match the Parse schema
#### Limitations
All facts posted to Parse in a single POST, currently have to appear in the same page. This is a UX limitation for the fact collector, and should be changed over time

var callback = function sendToAirtable(tab){

  var title = prompt("title");
  if (title){
    var company = prompt("company");
      if (company){
        var interest = prompt("interest");
          if ([1, 2, 3].includes(interest)){
            const body = {
              "fields": {
                "Title": title,
                "URL": tab.url,
                "Company": [
                  company
                ],
                "Interest": interest,
              },
              "typecast": true
            }
          
            if (title != undefined && company != undefined){
              postToAirtable(body)
            } else {
              alert("title and company required")
            }
      }
    }
  }
}

function postToAirtable(postBody){
  var xhr = new XMLHttpRequest();

  xhr.open("POST", 'https://api.airtable.com/v0/appjp1mWBsWIWgJse/Open%20Positions?api_key=keylFAs2bPeYqhYFt', true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function(err) {
      if (this.readyState === XMLHttpRequest.DONE) {
        const success = JSON.parse(xhr.responseText).fields.Title
        alert(`${success} created successfully!`)
      } 
  }
  xhr.send(JSON.stringify(postBody));
}

chrome.browserAction.onClicked.addListener(callback);
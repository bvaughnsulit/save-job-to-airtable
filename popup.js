let submitButton = document.getElementById('submit');

submitButton.onclick = function(element) {
  const position = document.getElementById('position').value;
  const company = document.getElementById('company').value;
  const interest = document.getElementById('interest').value;
  
  const body = {
    "fields": {
      "Title": position,
      //"URL": tab.url,
      "Company": [
        company
      ],
      "Interest": interest,
    },
    "typecast": true
  }

  postToAirtable(body);

};

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

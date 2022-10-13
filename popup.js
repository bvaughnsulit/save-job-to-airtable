import { API_KEY, BASE_ID } from './.config.js';
let url

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
   url = tabs[0].url;

   chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: getSelection
  },
  (injectionResults) => {
    const selectedText = injectionResults[0].result
    document.getElementById('title').value = selectedText
  });
});

document.getElementById('options').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const company = document.getElementById('company').value;
  const interest = document.getElementById('interest').value;
  
  const body = {
    "fields": {
      "Title": title,
      "URL": url,
      "Company": [
        company
      ],
      "Interest": interest,
    },
    "typecast": true
  }

  postToAirtable(body);
})

function postToAirtable(postBody){
  var xhr = new XMLHttpRequest();

  xhr.open("POST", `https://api.airtable.com/v0/${BASE_ID}/Open%20Positions?api_key=${API_KEY}`, true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function(err) {
      if (this.readyState === XMLHttpRequest.DONE) {
        const success = JSON.parse(xhr.responseText).fields.Title
        alert(`${success} created successfully!`)
      } 
  }
  xhr.send(JSON.stringify(postBody));
}

function getSelection(){
  return window.getSelection().toString()
}

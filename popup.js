import { API_KEY, BASE_ID } from './.config.js';

const baseUrl = `https://api.airtable.com/v0/${BASE_ID}/Open%20Positions?api_key=${API_KEY}`
let url

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
   url = tabs[0].url;

   chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: () => { return window.getSelection().toString() }
  },
  (injectionResults) => {
    const selectedText = injectionResults[0].result
    document.getElementById('title').value = selectedText
  });
});

const form = document.getElementById('options')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form)
 
  const body = {
    "fields": {
      "Title": data.get('title'),
      "URL": url,
      "Company": [
        data.get('company')
      ],
      "Interest": data.get('interest') || '',
      "Submitted Date": data.get('isSubmitted') && new Date().toLocaleDateString('sv') 
    },
    "typecast": true
  }

  postToAirtable(body);
})

async function postToAirtable(postBody){
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    })
    const parsed = await response.json() 
    const title = parsed.fields.Title
    alert(`${title} created successfully!`)
  } 
  catch(e) { }
}

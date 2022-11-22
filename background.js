chrome.contextMenus.create({
  id: "add-to-airtable",
  title: "Add '%s' to airtable",
  contexts: ["selection"]
})


chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId == "add-to-airtable"){ }
});


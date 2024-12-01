chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-in-logeion",
    title: "Open in Logeion",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-in-logeion" && info.selectionText) {
    const query = info.selectionText.trim();
    const url = `https://logeion.uchicago.edu/${encodeURIComponent(query)}`;

    // open new tab in tab index to the right of current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const newTabIndex = currentTab.index + 1;
      chrome.tabs.create({ url, index: newTabIndex });
    });
  }
});
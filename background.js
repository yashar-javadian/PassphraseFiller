browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillDropdowns") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, request);
    });
  }
});






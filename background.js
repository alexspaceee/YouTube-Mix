chrome.commands.onCommand.addListener(function (command) {
  if (command === "redirect_command") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];

      // Check if current website is YouTube
      var url = new URL(activeTab.url);
      if (url.hostname !== 'www.youtube.com' && url.hostname !== 'youtube.com') {
        return;
      }
      
      // Get video id from current YouTube url
      var urlParams = new URLSearchParams(url.search);
      var videoId = urlParams.get('v');

      if (videoId) {
        // Construct mix url
        var mixUrl = "https://www.youtube.com/watch?v=" + videoId + "&list=RD" + videoId + "&start_radio=1";

        // Redirect to mix url
        chrome.tabs.update(activeTab.id, {url: mixUrl});
      }
    });
  }
});

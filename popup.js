document.getElementById("saveButton").addEventListener("click", function () {
  const port = document.getElementById("portInput").value;
  chrome.storage.local.set({ obsWebSocketPort: port }, function () {
    document.getElementById(
      "status"
    ).textContent = `Port updated to ${port}. Please check the connection.`;
  });
});

chrome.storage.local.get("obsWebSocketPort", function (data) {
  if (data.obsWebSocketPort) {
    document.getElementById("portInput").value = data.obsWebSocketPort;
  }
});

chrome.runtime.sendMessage({ action: "getStatus" }, function (response) {
  document.getElementById("status").textContent = response;
});

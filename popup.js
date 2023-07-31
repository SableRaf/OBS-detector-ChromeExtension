chrome.runtime.sendMessage({ action: "getStatus" }, function (response) {
  document.getElementById("status").textContent = response;
});

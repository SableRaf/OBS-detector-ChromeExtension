let isConnected = false;
let ws;
let currentPort = 4444; // Default value
let CHECK_INTERVAL = 5000; // 5 seconds

console.log("Background service worker started."); // Log when the background script starts.

function attemptConnection(forceReconnect = false) {
  if (isConnected && !forceReconnect) {
    console.log("Already connected to OBS WebSocket on port:", currentPort);
    return; // exit the function if already connected and not forcefully reconnecting
  }

  if (ws) {
    ws.close();
    ws = null;
  }

  ws = new WebSocket(`ws://localhost:${currentPort}/`);

  ws.onopen = function () {
    isConnected = true;
    console.log("Connected to OBS WebSocket on port:", currentPort);

    // Update icon or badge to show connected status
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#0F0" });
  };

  ws.onclose = function (event) {
    isConnected = false;
    console.log("Disconnected from OBS WebSocket.", event.reason); // Log disconnection and potential reasons.

    // Update icon or badge to show disconnected status
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#F00" });

    // Try reconnecting after CHECK_INTERVAL
    setTimeout(attemptConnection, CHECK_INTERVAL);
  };

  ws.onerror = function (error) {
    isConnected = false;
    console.log(
      "Unable to connect to OBS WebSocket on port:",
      currentPort,
      ". It might not be running."
    );
  };
}

// Get the saved port from chrome.storage.local
chrome.storage.local.get("obsWebSocketPort", function (data) {
  if (data.obsWebSocketPort) {
    currentPort = parseInt(data.obsWebSocketPort, 10);
  }
  attemptConnection(); // Attempt the connection immediately after getting the port
});

// Listen for changes in chrome.storage.local
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === "local" && changes.obsWebSocketPort) {
    currentPort = parseInt(changes.obsWebSocketPort.newValue, 10);
    attemptConnection(true); // Restart the connection when the port is updated
  }
});

// Listener to respond to messages from popup or other parts of your extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message from popup:", message); // Log received messages.

  if (message.action === "getStatus") {
    const responseText = isConnected
      ? "OBS WebSocket is running!"
      : "OBS WebSocket is NOT running!";
    console.log("Sending response to popup:", responseText); // Log the response we're sending.
    sendResponse(responseText);
  }
});

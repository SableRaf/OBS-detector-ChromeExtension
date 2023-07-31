const OBS_WEBSOCKET_PORT = 4444;
let isConnected = false;

console.log("Background service worker started."); // Log when the background script starts.

// Create a WebSocket connection
const ws = new WebSocket(`ws://localhost:${OBS_WEBSOCKET_PORT}/`);

ws.onopen = function () {
  isConnected = true;
  console.log("Connected to OBS WebSocket."); // Log successful connection.

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
};

ws.onerror = function (error) {
  isConnected = false;
  console.error("Error with OBS WebSocket connection:", error); // Log errors with WebSocket.
};

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

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

  // Instead of logging the full error (which can be verbose), log a more user-friendly message
  console.log("Unable to connect to OBS WebSocket. It might not be running.");

  // If needed, you can uncomment the line below to log the full error for debugging purposes.
  // console.error("Error with OBS WebSocket connection:", error);

  // Update icon or badge to show error status
  chrome.action.setBadgeText({ text: "ERR" });
  chrome.action.setBadgeBackgroundColor({ color: "#F00" });
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

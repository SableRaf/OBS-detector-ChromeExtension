# OBS Detector Chrome Extension

## Description

The OBS Detector Chrome Extension is a simple utility that allows users to quickly identify whether the OBS WebSocket server is actively running on their local machine. It provides an instant visual feedback via the browser's toolbar. This is useful for developers who are building applications that interact with OBS via the WebSocket API. This extension is only meant to be used as a template for other developers to build upon. It is not extremely useful for the average user.

## Features

- **Instant Status**: Quickly view the running status of your OBS WebSocket server directly from your browser.
- **Badge Indicators**: Uses color-coded badge text (ON/OFF) to visually represent the WebSocket server's status.
- **Simple Interaction**: Click on the extension icon to get a more detailed status in a popup.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Ensure "Developer mode" is enabled (toggle the switch in the top-right).
4. Click on "Load unpacked" and select the directory where you saved/cloned this extension.
5. The OBS Detector icon should now appear in your browser's toolbar.

## Usage

Ensure that the [OBS WebSocket plugin](https://github.com/obsproject/obs-websocket) is installed and running in OBS. By default, this extension checks for a WebSocket server on `localhost` at port `4444`. If the OBS WebSocket server is running, the extension badge will display "ON" with a green background. If not, it will display "OFF" with a red background.

## Debugging

If you encounter any issues or unexpected behavior:

1. Navigate to `chrome://extensions/`.
2. Find the OBS Detector extension and click on "Inspect" for the background page.
3. Check the console logs for any messages or errors.

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

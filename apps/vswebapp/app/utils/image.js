/**
 * @description Opens a base64-encoded image in a new browser tab.
 *
 * This function creates a new browser tab and embeds the provided base64 image URL
 * into an iframe within the tab. It ensures the iframe takes up the full width and height
 * of the new tab's viewport. A small delay is added to ensure compatibility with browsers
 * like Firefox.
 *
 * @param {string} imageURL - The base64-encoded image URL to be displayed in the new tab.
 */
const openBase64ImageInNewTab = imageURL => {
  const w = window.open('about:blank');

  // FireFox seems to require a setTimeout for this to work.
  setTimeout(() => {
    w.document.body.appendChild(
      w.document.createElement('iframe'),
    ).src = imageURL;
    w.document.body.style.margin = 0;
    w.document.getElementsByTagName('iframe')[0].style.width = '100%';
    w.document.getElementsByTagName('iframe')[0].style.height = '100%';
    w.document.getElementsByTagName('iframe')[0].style.border = 0;
  }, 0);
};

export { openBase64ImageInNewTab };

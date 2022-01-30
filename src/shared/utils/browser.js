export const getTextContentsFromHtmlString = html => {
  const el = document.createElement("div");
  el.innerHTML = html;
  let cleanText = el.textContent.replace(/<\/?[^>]+(>|$)/g, "");
  return cleanText;
};

export const copyToClipboard = value => {
  const $textarea = document.createElement("textarea");
  $textarea.value = value;
  document.body.appendChild($textarea);
  $textarea.select();
  document.execCommand("copy");
  document.body.removeChild($textarea);
};

export const isFocusedElementEditable = () =>
  !!document.activeElement.getAttribute("contenteditable") ||
  ["TEXTAREA", "INPUT"].includes(document.activeElement.tagName);

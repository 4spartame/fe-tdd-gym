export function createElement(tagName, className, html) {
  const el = document.createElement(tagName);

  el.classList.add(className);
  if (typeof html !== "null" && typeof html !== "undefined")
    el.innerHTML = html;

  return el;
}

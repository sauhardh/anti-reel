function displayNone(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.style.display = "none";
  });
}

function hideTitle() {
  const headers = document.querySelectorAll("h3");
  const spans = document.querySelectorAll("span");
  [...headers, ...spans].forEach((el) => {
    if (
      el.innerText.toLowerCase() === "reels" ||
      el.innerText.toLowerCase() === "reel"
    ) {
      const parentDiv = el.closest("div");
      if (parentDiv) parentDiv.style.display = "none";
      else el.style.display = "none";
    }
  });
}

function hideReels() {
  if (window.location.href.includes("facebook.com/reel/")) {
    window.location.replace("https://www.facebook.com/");
  }

  hideTitle();
  const selectors = [
    'a[href*="/reel/"]',
    'div[aria-label="Reels"]',
    'a[aria-label="reel"]',
  ];

  selectors.forEach((selector) => displayNone(selector));
}

chrome.storage.sync.get("options", (data) => {
  const options = data.options || {};
  if (options.facebook) {
    const observer = new MutationObserver(hideReels);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    hideReels();
  }
});

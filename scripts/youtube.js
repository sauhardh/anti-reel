function displayNone(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.style.display = "none";
  });
}

function hideChip() {
  document.querySelectorAll("yt-chip-cloud-chip-renderer").forEach((el) => {
    if (el.innerText.toLowerCase().includes("shorts")) {
      el.style.display = "none";
    }
  });
}

function hideShorts() {
  if (window.location.href.includes("youtube.com/shorts/")) {
    window.location.replace("https://www.youtube.com");
  }

  const selectors = [
    "ytm-shorts-lockup-view-model",
    "ytm-shorts-lockup-view-model-v2",
    "ytd-rich-shelf-renderer[is-shorts]",
    'a[href*="/shorts/"]',
    'a[title="Shorts"]',
    "ytd-reel-shelf-renderer",
  ];
  selectors.forEach((selector) => displayNone(selector));
  hideChip();
}

chrome.storage.sync.get("options", (data) => {
  const options = data.options || {};

  if (options.youtube) {
    const observer = new MutationObserver(hideShorts);
    observer.observe(document.body, { childList: true, subtree: true });
    hideShorts();
  }
});

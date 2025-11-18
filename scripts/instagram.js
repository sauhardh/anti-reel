function displayNone(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.style.display = "none";
  });
}

function hideIcon() {
  document.querySelectorAll("a[aria-label]").forEach((a) => {
    if ((a.getAttribute("aria-label") || "").toLowerCase().includes("reels")) {
      const parentDiv = a.closest("div");
      if (parentDiv) parentDiv.style.display = "none";
      else a.style.display = "none";
    }
  });
}

function hideReels() {
  if (window.location.href.includes("instagram.com/reels/")) {
    window.location.replace("https://www.instagram.com/");
  }

  hideIcon();
  const selectors = ['a[href*="/reels/"]', 'svg[aria-label="Reels"]'];
  selectors.forEach((selector) => displayNone(selector));
}

chrome.storage.sync.get("options", (data) => {
  const options = data.options || {};
  if (options.instagram) {
    const observer = new MutationObserver(hideReels);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    hideReels();
  }
});

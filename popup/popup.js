const toggleYoutube = document.querySelector("#toggleYoutube");
const toggleFacebook = document.querySelector("#toggleFacebook");
const toggleInstagram = document.querySelector("#toggleInstagram");

const defaultOptions = {
  youtube: true,
  facebook: true,
  instagram: true,
};

async function init() {
  // Get the stored options or defaults
  const data = await chrome.storage.sync.get("options");
  const options = { ...defaultOptions, ...(data.options || {}) };

  // Reflect changes on UI
  toggleYoutube.checked = options.youtube;
  toggleFacebook.checked = options.facebook;
  toggleInstagram.checked = options.instagram;

  // Listen for an event
  toggleYoutube.addEventListener("change", () =>
    updateOptions("youtube", toggleYoutube.checked),
  );
  toggleInstagram.addEventListener("change", () =>
    updateOptions("instagram", toggleInstagram.checked),
  );
  toggleFacebook.addEventListener("change", () =>
    updateOptions("facebook", toggleFacebook.checked),
  );
}

async function updateOptions(key, value) {
  const data = await chrome.storage.sync.get("options");
  const options = { ...defaultOptions, ...(data.options || {}) };
  options[key] = value;

  // set the value
  await chrome.storage.sync.set({ options });

  // Reload the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });
}

init();

chrome.webNavigation.onCreatedNavigationTarget.addListener(async (details) => {
    try {
        const url = details.url || '';
        // Only act on Gmail account switching pattern
        if (!url.startsWith('https://mail.google.com/mail/u/')) return;
        // details.tabId is the newly created tab id; details.sourceTabId is the originating tab id
        const newTabId = details.tabId;
        const sourceTabId = details.sourceTabId;
        if (!sourceTabId) {
            // If we don't know the source, try to close the new tab and open the URL in the last active tab.
            chrome.tabs.remove(newTabId).catch(() => { });
            return;
        }
        // Close the newly created tab
        chrome.tabs.remove(newTabId).catch(() => { });
        // Update the source tab to navigate to the Gmail account URL
        chrome.tabs.update(sourceTabId, { url }).catch(() => { });
    } catch (err) {
        console.error('Same-Tab Switcher error', err);
    }
});
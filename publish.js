// Hide right sidebar on all pages
(function () {
  function hideRightSidebar() {
    const rightSidebar = document.getElementsByClassName("site-body-right-column")[0];
    if (rightSidebar) {
      rightSidebar.style = "visibility: hidden; flex: 0; width: 0;";
    }
  }

  function initializeRendererObserver() {
    const rendered = document.getElementsByClassName("markdown-rendered")[0];
    if (rendered) {
      new MutationObserver(hideRightSidebar).observe(rendered, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
    hideRightSidebar();
  }

  initializeRendererObserver();
})();

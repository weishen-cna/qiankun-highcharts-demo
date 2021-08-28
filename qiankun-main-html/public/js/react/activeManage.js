(() => {
  const ACTIVE_KEY = "qinakun_html_active";
  const baseUrl = "Report";
  const homePage = `/${baseUrl}/MarketPlaceDashboard`;

  function getActive(key) {
    return window.localStorage.getItem(key || ACTIVE_KEY);
  }

  function setActive(value) {
    window.localStorage.setItem(ACTIVE_KEY, value);
  }

  function removeActive() {
    window.localStorage.removeItem(ACTIVE_KEY);
  }

  window.activeManage = {
    baseUrl,
    homePage,
    getActive,
    setActive,
    removeActive
  }
})();

(function (Window) {
  const { registerMicroApps, start, addGlobalUncaughtErrorHandler } = qiankun;
  function initQinankun(apps, options = {}) {
    registerMicroApps(apps, options);
    return start;
  }

  function initActions(state) {
    const { initGlobalState } = qiankun;
    return initGlobalState(state);
  }

  function qiankunInit({setLoading, lifeCycle, apps}, opts = {}) {
    const { antd, location } = window;
    const { message } = antd;

    window.__POWERED_BY_QIANKUN__ = true;
    const { origin } = location;

    const start = initQinankun(apps, lifeCycle);

    /**
     * 添加全局的未捕获异常处理器
     */
    addGlobalUncaughtErrorHandler((event) => {
      setLoading(false)
      const { message: msg } = event;
      // 加载失败时提示
      if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
        console.log("微应用加载失败，请检查应用是否可运行")
        // message.error("微应用加载失败，请检查应用是否可运行");
      } else {
        console.log('子应用异常', event.message)
        // message.error("微应用加载失败，请检查应用是否可运行");
      }
    });

    start(opts);
  }

  Window.qiankunScript = {
    initActions,
    addGlobalUncaughtErrorHandler,
    qiankunInit
  };
})(window);

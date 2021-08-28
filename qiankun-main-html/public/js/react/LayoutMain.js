(() => {
  const { Layout, Menu, Spin } = antd;
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

  const menus = [
    {
      label: "子组件",
      key: "2",
      children: [
        { label: "/MarketPlaceDashboard", key: "/Report/MarketPlaceDashboard" },
      ]
    }
  ];

  // 组件间通信actions初始化
  const actions = qiankunScript.initActions({
    name: "Jack",
    age: 1,
    path: activeManage.getActive()
  });

  const apps = [
    {
      name: 'MarketPlaceDashboard',
      entry: "http://localhost:10200/",
      container: "#amazonevent",
      activeRule: `/Report`,
      props: actions,
    },
  ];

  function LayoutMain({ setAc }) {
    const [loading, setLoading] = React.useState(false);
    const [selectedKeys, setSelectedKeys] = React.useState([activeManage.getActive() || activeManage.homePage]);

    function logout() {
      window.localStorage.removeItem("ac");
      window.localStorage.removeItem("re");
      window.localStorage.removeItem("exptime");
      setAc(false)
      menuSelect({ key: '' })
    }

    const lifeCycle = React.useMemo(() => {
      return {
        // qiankun 生命周期钩子 - 微应用加载前
        beforeLoad: (app) => {
          setLoading(true)
          console.log("before load", app.name);
          return Promise.resolve();
        },
        beforeMount: () => { },
        // qiankun 生命周期钩子 - 微应用挂载后
        afterMount: (app) => {
          setLoading(false)
          // 加载微应用前，进度条加载完成
          console.log("after mount", app.name);
          return Promise.resolve();
        },
        beforeUnmount: () => { },
        afterUnmount: () => { },
      }
    }, [setLoading])

    const menuSelect = React.useCallback(
      ({ key: path }) => {
        // const { origin } = location;
        activeManage.setActive(path);
        // location.href = `${origin}${path}`;
        history.pushState(null, null, path)
        setSelectedKeys([path])
      },
      [setSelectedKeys],
    );

    React.useEffect(() => {
      if (!window.qiankunStarted) {
        qiankunScript.qiankunInit({ setLoading, actions, lifeCycle, apps }, { prefetch: 'all', sandbox: true });
        window.qiankunStarted = true
      }
      history.pushState(null, null, selectedKeys[0])
    }, [])


    React.useEffect(() => {
      actions.onGlobalStateChange((state, prev) => {
        console.log("主应用: 变更前");
        console.log(prev);
        console.log("主应用: 变更后");
        console.log(state);
        setSelectedKeys([state.path])
        activeManage.setActive(state.path);
        history.pushState(null, null, state.path)
      });
    }, []);

    const spinStyle = {
      position: "absolute",
      left: 0,
      top: 0,
      height: "calc(100vh - 118px)",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <Layout id="components-layout-demo-top-side-2">
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            onClick={() => {
              actions.setGlobalState({ age: Math.random() })
            }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
          <div className="logout" onClick={logout}>登出</div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              onSelect={menuSelect}
              mode="inline"
              selectedKeys={selectedKeys}
              defaultOpenKeys={[]}
              style={{ height: "100%", borderRight: 0 }}
            >
              {menus.map((menu) => (
                <SubMenu key={menu.key} title={menu.label}>
                  {menu.children.map((item) => (
                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content class="main-content">
              <div id="amazonevent"></div>
              {
                loading ? <Spin size="large" spinning={loading} style={spinStyle} /> : null
              }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  window.LayoutMain = LayoutMain;
})();

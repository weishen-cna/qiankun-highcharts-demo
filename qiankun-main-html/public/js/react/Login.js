(() => {
  const { Form, Input, Button, Layout } = antd;
  const { Content } = Layout;

  const Login = ({ setAc }) => {
    const [loading, setLoading] = React.useState(false);

    function loginAjax({ username, password }) {
      jQuery.ajax({
        url: "https://apiuser.pacvue.com/api/Login",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ username, password }),
        dataType: "json",
        type: "POST",
        error: () => {
          setLoading(false);
        },
        success: refreshToken,
      });
    }

    function refreshToken({code, data: value}) {
      window.localStorage.setItem("ac", "lx" + value.accessToken);
      var fdate = new Date().getTime() + value.expiresIn * 1000;
      window.localStorage.setItem("re", "gx" + value.refreshToken);
      window.localStorage.setItem("exptime", fdate);
      setLoading(false);
      setAc(true)
    }

    const onFinish = ({ password, username }) => {
      setLoading(true);
      loginAjax({ password, username });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Layout className="layout">
        <Content className="content">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  };
  window.Login = Login;
})();

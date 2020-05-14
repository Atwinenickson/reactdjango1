import React from 'react';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    this.props.onAuth(values.username, 
      values.email,
      values.password, values.confirm)
    this.props.history.push('/');
  };
  return (
        <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
    <Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="What do you want to use to log in?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
            whitespace: true
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        <Form.Item>
           <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>Signup</Button>
           <br />
           <br />
           Or
           <br />
           <NavLink style={{marginRight:'10px'}} to='/signup/'> 
           login
           </NavLink>
          </Form.Item>
    </Form>
  );
};

 const mapStateToProps = (state) => {
  return {
    laoding: state.loading,
    error:state.error
  }
 }

 const mapDispatchToProps = dispatch => {
  return {
    onAuth:(username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
  }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
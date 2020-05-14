import React from 'react';
import { Form, Input, Button} from 'antd';
import axios from 'axios'

const FormItem = Form.Item;

class CustomForm extends React.Component {

handleFormSubmit = (event, requestType, articleID) => {
  const title = event.target.elements.title.value;
  const content = event.target.elements.content.value;
  const description = event.target.elements.content.value;
  console.log(title)

  switch(requestType) {
    case 'post':
          return axios.post('http://127.0.0.1:8000/api/', {
            title:title,
            content:content,
            description:description
          })
          .then(res =>console.log(res))
          .catch(error => console.err(error))

    case 'put':
          return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
            title:title,
            content:content,
            description:description
          })
          .then(res =>console.log(res))
          .catch(error => console.err(error))

  }

}

  render() {
  return (
    <div>
      <form onSubmit={(event) => this.handleFormSubmit(
          event, this.props.requestType, this.props.articleID
        )} >
        <FormItem label="Title">
          <Input name="title" placeholder="put title here" />
        </FormItem>
        <FormItem label="Content">
          <Input name="content" placeholder="enter content here" />
        </FormItem>
        <FormItem label="Description">
          <Input name="description" placeholder="description also here" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
        </FormItem>
      </form>
    </div>
  );
}

}

export default CustomForm;
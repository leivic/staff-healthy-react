import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form,DatePicker } from 'antd';
import moment from 'moment';
import '../Styles/tablebox2.css'

const { RangePicker } = DatePicker;
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => { //函数组件 一行   剩余参数
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ //组件 可编辑单元格
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [ //数据，一列是一个对象
      {
        title: '检查日期',
        dataIndex: 'detectiontime',
        width: '10%',
	render:()=>(<DatePicker defaultValue={moment(new Date())} bordered={false} />) 
      },
      {
        title: '检查种类',
        dataIndex: 'detectiontype',
	width: '15%',
	editable: true,
      },
      {
        title: '检测结论',
        dataIndex: 'detectionresult',
        editable: true,
        width: '20%', 
      },
      {
        title: '检查机构',
        dataIndex: 'detectiondepartment',
        editable: true, 
        width: '10%',
      },
      {
        title: '岗位',
        dataIndex: 'post',
        editable: true, 
        width: '10%',
      },
      {
        title: '人员处理情况',
        dataIndex: 'staffdeal',
        editable: true, 
        width: '10%',
      },
      {
        title: '本人签字',
        dataIndex: 'autograph',
        editable: true, 
        width: '15%',
      },
      {
        title: '现场处理情况',
        dataIndex: 'sitedeal',
        editable: true, 
        width: '15%',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length > 0 ? ( //大于0行时，才有删除按钮
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
          width: '10%',
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          detectiontime: '32',
          detectiontype: '检查日期',
          detectiontype: '检查种类',
          detectionresult:'检测结论',
          detectiondepartment:'检测机构',
          post:'岗位',
	  staffdeal:'人员处理',
	  autograph:'本人签字',
	  sitedeal:'现场处理情况' 
        },
       
      ],
      count: 1,
    };
  }

  handleDelete = (key) => { //删除按钮的方法 
    const dataSource = [...this.state.dataSource];   //剩余参数 展开运算符 ...this.state.datasource 等于 this.state.datasource这个数组
    this.setState({ //类组件的setstate方式
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => { //增加一行的方法  增加数据，列表自然会增加一行
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData], //...datasource 等于目前datasource[]这个数组
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = { //使用两个子组件
      body: {
        row: EditableRow, 
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {  //数组的.map方法 循环每一列 判断是否可编辑 
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <div className='table2box'>
         <h2 style={{textAlign:'center',marginTop:'10px'}}>历次职业健康检查结果及处理情况</h2>   
        <span style={{marginRight:'20px'}}>劳动者姓名:小白</span>
        <span>档案号：639857119</span>
        <Button
          onClick={this.handleAdd} 
          type="primary"
          style={{
            marginBottom: 16,
            float:'right'
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        </div>
      </div>
    );
  }
}

export default EditableTable 
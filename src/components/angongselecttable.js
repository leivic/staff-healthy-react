//import { getuserdataforangongselect } from '../api/api' //这个基础数据可以直接写在组件内 因为只要是能访问这个路由的权限（安全科和安工）都是查当前区域数据 如果是安全科则查所有数据  但获取数据我们还是写在父组件里面 因为可以根据是否获取完毕数据来渲染这个组件 避免本组件data数据二次渲染
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState, memo } from 'react';
import Highlighter from 'react-highlight-words';

  //数据
/* 我的基础数据格式应该是这样的
 {
    key: '1',
    id:'1'  //这个id作为userid
    name: '小白',
    yuangongbianhao: '22060011',
    zone: '车身车间',
  },
  {
    key: '2',
    id:'2'
    name: '小红',
    yuangongbianhao: '22060022',
    zone: '总装车间',
  }
*/

  

const Angongselecttable = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [top, setTop] = useState('none');  //分页设置
  const [bottom, setBottom] = useState('bottomLeft'); //分页设置


  const rowSelection = { //某行被选择的配置对象
	onChange: (selectedRowKeys, selectedRows) => {
	  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		// selectedRowKeys 是当前选择的行的key值 这个key我们后端设置的是和user表的id一样的 要传回父组件
		props.onAngongselecttablesgetkey(selectedRowKeys) //从子组件取到父组件的方法 传入子组件的值
	},
	getCheckboxProps: (record) => ({
	  disabled: record.name === 'Disabled User',
	  // Column configuration not to be checked
	  name: record.name,
	}),
      }; 	

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [ //基础表格配置
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',  //这是那个字段的数据
      width: '30%',
      ...getColumnSearchProps('id'), //配置一个筛选功能
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'), //配置一个筛选功能
    },
    {
      title: '员工编号',
      dataIndex: 'yuangongbianhao',
      key: 'yuangongbianhao',
      ...getColumnSearchProps('yuangongbianhao'),
      sorter: (a, b) => parseInt(a.yuangongbianhao) - parseInt(b.yuangongbianhao), //
      sortDirections: ['descend', 'ascend'],  //配置一个sort
    },
    {
	title: '所属区域',
	dataIndex: 'zone',
	key: 'zone',
	width: '20%',
	...getColumnSearchProps('zone'), //配置一个筛选功能
      }
  ];
  return <Table columns={columns} dataSource={props.data} pagination={{
	position: [top, bottom],
	pageSize: 10,
	
	
	/*这样写分页是先读出所有数据 再在前端分页 不知道数据量大会不会卡 懒加载应该是到哪页从后端读取哪页的数据*/
      }}
      rowSelection={{
	type: 'radio',
	...rowSelection,
      }}
      />;//其实主要只准备两个东西 一个表格配置相关数据 一个基础数据 然后返回一个封装好的组件并配置相关数据 pagination是分页设置

};

export default memo(Angongselecttable); //memo用来减少重复渲染 在渲染时会对props做一次浅层次的对比,防止子组件出现额外的渲染

//如果props没发生变化,就不会渲染
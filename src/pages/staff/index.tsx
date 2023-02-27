import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Table,
  Pagination,
  message as $message,
  Switch,
  Modal,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';

// api
import { getMemberList, memberSwitch } from '@/api/staff';
// 组件
import AddModal from './components/AddModal';

interface PageInfo {
  current: number;
  pageSize: number;
  total: number;
}

const Staff: FC = () => {
  const [messageApi, contextHolder] = $message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const grid = {
    gutter: 12,
    colSpan: 6,
  };

  const columns: ColumnsType<any> = [
    {
      title: '用户名称',
      dataIndex: 'nickname',
      width: 140,
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
      width: 140,
      render: (_: any, record: any) => <>{record.name || '--'}</>,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 120,
    },
    {
      title: '用户ID',
      dataIndex: 'user_id',
      width: 120,
    },
    {
      title: '角色',
      dataIndex: 'role_title',
      width: 140,
      render: (_: any, record: any) => <>{record.role_title || '--'}</>,
    },
    {
      title: '授权状态',
      dataIndex: 'status',
      width: 90,
      render: (text: number, record: any) => (
        <Switch
          checked={!!text}
          disabled={isSuperAdmin(record)}
          onClick={(checked, event) => authChange(checked, event, record)}
        />
      ),
    },
    {
      title: '最近登录时间',
      dataIndex: 'updated_at',
      width: 140,
      render: (_: any, record: any) => <>{record.updated_at || '--'}</>,
    },
  ];

  function initSearch() {
    setPageInfo({
      ...pageInfo,
      current: 1,
    });
    getList(1, pageInfo.pageSize);
  }

  function reset() {
    form.resetFields();
    initSearch();
  }

  function getList(current: number, pageSize: number) {
    const { phone, nickname, name } = form.getFieldsValue();
    setLoading(true);
    getMemberList({
      phone,
      nickname,
      name,
      page: current,
      page_size: pageSize,
    })
      .then((res) => {
        const { code, data, message } = res;
        if (code !== 0) {
          messageApi.error(message);
          return;
        }
        setDataList(data.lists);
        setPageInfo({
          current,
          pageSize,
          total: data.paginate.total,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onPageChange(page: number, pageSize: number) {
    setPageInfo({
      ...pageInfo,
      current: page,
      pageSize,
    });
    getList(page, pageSize);
  }

  function authChange(value: boolean, e: any, record: any) {
    e.preventDefault();
    Modal.confirm({
      title: value ? '授权用户' : '取消授权',
      icon: null,
      content: value
        ? '授权该用户账号，用户可访问平台，确认授权？'
        : '取消该用户账号授权后，用户不能访问平台，确认取消授权？',
      okText: value ? '确认授权' : '确认取消',
      cancelText: '关闭',
      onOk() {
        return new Promise((resolve, reject) => {
          memberSwitch({
            user_id: record.user_id,
            switch: value ? 'enable' : 'disable',
          }).then((res) => {
            const { code, message } = res;
            if (code !== 0) {
              messageApi.error(message);
              reject();
              return;
            }
            messageApi.success(message);
            getList(pageInfo.current, pageInfo.pageSize);
            resolve(true);
          });
        });
      },
    });
  }

  function isSuperAdmin(record: any) {
    if (record.role_list.some((item: any) => item.label === 'super_admin')) return true;
    return false;
  }

  function addStaff() {
    setAddModalVisible(true);
  }
  function handleCancel() {
    setAddModalVisible(false);
  }

  useEffect(() => {
    getList(1, pageInfo.pageSize);
  }, []);

  return (
    <>
      {contextHolder}
      <div className={styles.staffContainer}>
        <Card bordered={false}>
          <h3>员工管理</h3>
          <Form form={form} {...formItemLayout} className={styles.filter}>
            <Row gutter={grid.gutter}>
              <Col span={grid.colSpan}>
                <Form.Item name="phone" label="手机号码">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={grid.colSpan}>
                <Form.Item name="nickname" label="用户名">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={grid.colSpan}>
                <Form.Item name="name" label="真实姓名">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={grid.colSpan}>
                <Button onClick={reset}>重置</Button>
                <Button type="primary" onClick={() => getList(pageInfo.current, pageInfo.pageSize)}>
                  查询
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card bordered={false} className={styles.table}>
          <div className={styles.tableTilte}>
            <h3>员工列表</h3>
            <Button type="primary" onClick={addStaff}>
              添加员工
            </Button>
          </div>
          <Table
            className={styles.tableContainer}
            loading={loading}
            rowKey="user_id"
            columns={columns}
            dataSource={dataList}
            scroll={{ x: 1300 }}
            pagination={false}
          />
          <Pagination
            className={styles.tableBottom}
            current={pageInfo.current}
            pageSize={pageInfo.pageSize}
            total={pageInfo.total}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 项数据`}
            onChange={onPageChange}
          />
        </Card>
      </div>
      <AddModal
        visible={addModalVisible}
        reset={() => initSearch()}
        cancel={() => handleCancel()}
      />
    </>
  );
};

export default Staff;

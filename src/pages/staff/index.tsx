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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';

interface PageInfo {
  current: number;
  pageSize: number;
  total: number;
}

const Staff: FC = () => {
  // ref
  const refEditRoleModal = useRef<any>(null);

  const [messageApi, contextHolder] = $message.useMessage();
  const [options, setOptions] = useState([]);
  const [role, setRole] = useState<number | undefined>();
  const [keywords, setKeywords] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<{ user_id: number }>();
  const [dataList, setDataList] = useState([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: ColumnsType<any> = [
    {
      title: '用户ID',
      dataIndex: 'user_id',
      width: 80,
    },
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
      title: '邮箱',
      dataIndex: 'email',
      width: 140,
      render: (_: any, record: any) => <>{record.email || '--'}</>,
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
          // onClick={(checked, event) => authChange(checked, event, record)}
        />
      ),
    },
    {
      title: '最近登录时间',
      dataIndex: 'updated_at',
      width: 140,
      render: (_: any, record: any) => <>{record.updated_at || '--'}</>,
    },
    {
      title: '操作',
      dataIndex: 'opreate',
      width: 200,
      align: 'center',
      render: (text: any, record: any) => (
        <>
          <Button
            type="link"
            disabled={isSuperAdmin(record)}
            // onClick={() => assignRole(record)}
          >
            分配角色
          </Button>
          <Button
            type="link"
            disabled={isSuperAdmin(record)}
            // onClick={() => editRole(record)}
          >
            编辑角色
          </Button>
        </>
      ),
    },
  ];

  function onPageChange(page: number, pageSize: number) {
    setPageInfo({
      ...pageInfo,
      current: page,
      pageSize,
    });
    // getList(page, pageSize, keywords, role);
  }

  function isSuperAdmin(record: any) {
    if (record.role_list.some((item: any) => item.label === 'super_admin')) return true;
    return false;
  }

  useEffect(() => {
    // initSearch();
    // getRole();
  }, []);

  return (
    <>
      {contextHolder}
      <div className={styles.staffContainer}>
        <Card bordered={false}>
          <h3>员工管理</h3>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item name="mobile" label="手机号码">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="user" label="用户名">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="name" label="真实姓名">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col
                span={6}
                style={{
                  textAlign: 'right',
                }}
              >
                <Button
                  style={{
                    marginRight: '16px',
                  }}
                >
                  重置
                </Button>
                <Button type="primary">查询</Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card bordered={false} className={styles.table}>
          <div className={styles.tableTilte}>
            <h3>员工列表</h3>
            <Button type="primary">添加员工</Button>
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
    </>
  );
};

export default Staff;

import type { FC } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Select,
  Table,
  Pagination,
  Card,
  Modal,
} from 'antd';
import { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import { getUserList, getUserCompanyList, setMemberSwitch } from '@/api/user';
import { USER_STATUS } from '@/utils/config';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  user_id: number;
}
const User: FC = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState(0);
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'app_id',
      width: 60,
      key: 'app_id',
    },
    {
      title: '用户名',
      key: 'nickname',
      dataIndex: 'nickname',
      width: 140,
    },
    {
      title: '用户ID',
      key: 'user_id',
      dataIndex: 'user_id',
      width: 140,
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
      width: 140,
    },
    {
      title: '真实姓名',
      key: 'name',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '所属商户',
      key: 'title',
      dataIndex: 'title',
      width: 120,
    },
    {
      title: '状态',
      key: 'status',
      width: 120,
      render: (_: any, record: any) => (
        <div>
          {record.status === 1 && <p>启用</p>}
          {record.status === 0 && <p>禁用</p>}
        </div>
      ),
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      width: 120,
    },
    {
      title: '操作',
      key: 'opea',
      width: 80,
      fixed: 'right',
      render: (_: any, record: any) => (
        <div>
          {record.status === 0 && (
            <a onClick={() => showModal(record.status, record.user_id)}>启用</a>
          )}
          {record.status === 1 && (
            <a onClick={() => showModal(record.status, record.user_id)}>禁用</a>
          )}
        </div>
      ),
    },
  ];
  const getUserCompanyListData = () => {
    getUserCompanyList({
      page: 1,
      page_size: 50,
    }).then((res) => {
      if (res.code !== 0) {
        messageApi.open({
          type: 'error',
          content: res.message,
        });
        return;
      }
      setCompanyList(res?.data?.lists || []);
    });
  };
  const search = (page: number, page_size: number) => {
    form
      .validateFields()
      .then((values) => {
        const params = Object.assign(
          { page: page || current, page_size: page_size || pageSize },
          values,
        );
        getUserList(params).then((res) => {
          const { code, data, message } = res;
          if (code !== 0) {
            messageApi.open({
              type: 'error',
              content: message,
            });
          }
          setList(data?.lists || []);
          setTotal(data?.paginate?.total || 0);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 项数据`;
  const onShowSizeChange = async (current: number, size: number) => {
    setCurrent(current);
    setPageSize(size);
    search(current, size);
  };
  const reset = () => {
    form.resetFields();
    setCurrent(1);
    setPageSize(10);
    search(1, 10);
  };
  const showModal = (status: number, id: number) => {
    setId(id);
    setStatus(status);
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setMemberSwitch({
      user_id: id,
      switch: status === 1 ? 'disable' : 'enable',
    })
      .then((res) => {
        if (res.code !== 0) {
          messageApi.open({
            type: 'error',
            content: res.message,
          });
          return;
        }
        messageApi.open({
          type: 'success',
          content: '操作成功',
        });
        setOpen(false);
        search(current, pageSize);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    search(current, pageSize);
    getUserCompanyListData();
  }, []);
  return (
    <div className="user-container">
      <Card>
        <h4
          style={{
            fontSize: '18px',
            marginBottom: '24px',
          }}
        >
          用户管理
        </h4>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item
                name="phone"
                label="手机号码"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || /^1\d{10}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('手机号码格式错误'));
                    },
                  }),
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="nickname" label="用户名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="name" label="真实姓名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="user_id" label="用户ID">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="company_name" label="所属商户">
                <Select
                  placeholder="请选择"
                  showSearch
                  options={companyList.map((city: any) => ({
                    label: city.company.title,
                    value: city.company.title,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择" options={USER_STATUS} />
              </Form.Item>
            </Col>
            <Col
              span={6}
              offset={6}
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                style={{
                  marginRight: '16px',
                }}
                onClick={reset}
              >
                重置
              </Button>
              <Button type="primary" onClick={() => search(1, pageSize)}>
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <h4
          style={{
            fontSize: '18px',
            marginBottom: '24px',
          }}
        >
          用户管理列表
        </h4>
        <Table
          dataSource={list}
          rowKey={(record) => record.user_id}
          columns={columns}
          scroll={{ x: 1500 }}
          pagination={false}
        />
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Pagination
            current={current}
            total={total}
            showTotal={showTotal}
            onChange={onShowSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
        {contextHolder}
      </Card>
      <Modal
        title={status === 1 ? `禁用用户` : '启用用户'}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={status === 1 ? `确认禁用` : '确认启用'}
      >
        <p
          style={{
            textAlign: 'center',
            margin: '30px 0',
          }}
        >
          {status === 1 ? '禁用后该用户将不可登录SCM系统，确认禁用？' : '确认启用该用户'}
        </p>
      </Modal>
    </div>
  );
};

export default User;

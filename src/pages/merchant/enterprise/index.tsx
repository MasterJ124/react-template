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
import '../index.less';
import type { PaginationProps } from 'antd';
import { getMerchantList, setMerchantStatus } from '@/api/merchant';
import { MERCHANT_TYPE, AUDIT_STATUS, MERCHANT_STATUS } from '@/utils/config';
import ExamineModal from '../components/examineModal';

const Enterprise: FC = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState(0);
  const [checkModal, setCheckModal] = useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      key: 'id',
    },
    {
      title: '公司名称',
      key: 'title',
      width: 140,
      render: (text, record: any) => <p>{record.company_info.title}</p>,
    },
    {
      title: '统一社会信用代码',
      key: 'cert_code',
      width: 160,
      render: (text, record: any) => <p>{record.company_info.cert_code}</p>,
    },
    {
      title: '审核状态',
      key: 'status',
      width: 100,
      render: (text, record: any) => (
        <div>
          {record.status === 1 && <p className="pass">审核通过</p>}
          {record.status === 2 && <p className="reject">审核拒绝</p>}
          {record.status === 3 && <p className="default">待审核</p>}
        </div>
      ),
    },
    {
      title: '商户状态',
      key: 'company_status',
      width: 100,
      render: (text, record: any) => (
        <div>
          {record.company_info.status === 1 && <p className="pass">启用</p>}
          {record.company_info.status === 2 && <p className="reject">禁用</p>}
          {![1, 2].includes(record.company_info.status) && <p>— —</p>}
        </div>
      ),
    },
    {
      title: '申请人用户名',
      key: 'nickname',
      width: 120,
      render: (text, record: any) => <p>{record.operator_info.nickname}</p>,
    },
    {
      title: '营业期限',
      key: 'title',
      width: 200,
      render: (text, record: any) => (
        <p>
          {record.company_info.company_end_at
            ? record.company_info.company_start_at + '-' + record.company_info.company_end_at
            : '长期'}
        </p>
      ),
    },
    {
      title: '经营地址',
      key: 'address',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.address}</p>,
    },
    {
      title: '法人',
      key: 'corporate_name',
      width: 80,
      render: (text, record: any) => <p>{record.company_info.corporate_name}</p>,
    },
    {
      title: '营业执照',
      key: 'license',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.license}</p>,
    },
    {
      title: '法人证件照',
      key: 'corporate_identity_front',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.corporate_identity_front}</p>,
    },
    {
      title: '申请人手机号',
      key: 'phone',
      width: 130,
      render: (text, record: any) => <p>{record.operator_info.phone}</p>,
    },
    {
      title: '超管手机号',
      key: 'admin_info',
      width: 130,
      render: (text, record: any) => <p>{record.admin_info.phone}</p>,
    },
    {
      title: '申请时间',
      key: 'created_at',
      width: 160,
      render: (text, record: any) => <p>{record.company_info.created_at}</p>,
    },
    {
      title: '商户类型',
      key: 'type',
      width: 100,
      render: (text, record: any) => (
        <div>
          {record.company_info.type === 1 && <p>MCN</p>}
          {record.company_info.type === 2 && <p>供应商</p>}
        </div>
      ),
    },
    {
      title: '审核时间',
      key: 'audited_at',
      width: 160,
      render: (text, record: any) => <p>{record.audited_at || '— —'}</p>,
    },
    {
      title: '失败原因',
      key: 'reason',
      width: 120,
      render: (text, record: any) => <p>{record.reason || '— —'}</p>,
    },
    {
      title: '备注',
      key: 'remark',
      width: 120,
      render: (text, record: any) => <p>{record.remark || '— —'}</p>,
    },
    {
      title: '操作',
      key: 'opea',
      width: 80,
      fixed: 'right',
      render: (text, record: any) => (
        <div>
          {record.status === 3 && <a onClick={() => checkFn(record.id)}>审核</a>}
          {record.status === 1 && record.company_info.status === 2 && (
            <a onClick={() => showModal(record.company_info.status, record.id)}>启用</a>
          )}
          {record.status === 1 && record.company_info.status === 1 && (
            <a onClick={() => showModal(record.company_info.status, record.id)}>禁用</a>
          )}
        </div>
      ),
    },
  ];
  const search = (page: number, page_size: number) => {
    form
      .validateFields()
      .then((values) => {
        const params = Object.assign(
          { category: 1, page: page || current, page_size: page_size || pageSize },
          values,
        );
        getMerchantList(params).then((res) => {
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
  const checkFn = (id: number) => {
    setId(id);
    setCheckModal(true);
  };
  const cancel = () => {
    setCheckModal(false);
    search(current, pageSize);
  };
  const showModal = (status: number, id: number) => {
    setId(id);
    setStatus(status);
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setMerchantStatus({
      id,
      status: status === 1 ? 2 : 1,
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
          企业商户管理
        </h4>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="title" label="公司名称">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cert_code" label="统一代码">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="operator_phone"
                label="申请人手机号"
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
              <Form.Item
                name="admin_phone"
                label="超管手机号"
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
              <Form.Item name="type" label="商户类型">
                <Select placeholder="请选择" options={MERCHANT_TYPE} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="audit_status" label="审核状态">
                <Select placeholder="请选择" options={AUDIT_STATUS} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="merchant_status" label="商户状态">
                <Select placeholder="请选择" options={MERCHANT_STATUS} />
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
          企业商户管理列表
        </h4>
        <Table
          dataSource={list}
          rowKey={(record) => record.id}
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
        title={status === 1 ? `禁用商户` : '启用商户'}
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
          {status === 1 ? '禁用后该商户将不可访问管理中心，确认禁用？' : '确认启用该商户？'}
        </p>
      </Modal>
      {checkModal && <ExamineModal id={id} cancel={cancel} />}
    </div>
  );
};

export default Enterprise;

import type { FC } from 'react';
import { Form, Input, Select, Modal, message } from 'antd';
import { useState } from 'react';
import { merchantCheck } from '@/api/merchant';
interface propsType {
  id: number;
  cancel: any;
}
const examineModal: FC<propsType> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(true);
  const [showReason, setReason] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        const params = Object.assign({ id: props.id }, values);
        merchantCheck(params)
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
              content: '提交成功',
            });
            setOpen(false);
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const handleCancel = () => {
    setOpen(false);
    props.cancel();
  };
  const selectChang = (e: string) => {
    const flag = e === '2';
    setReason(flag);
  };
  return (
    <Modal
      title="审核"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        style={{
          margin: '40px 0',
        }}
        onFinish={handleOk}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item
          label="审核结果"
          name="status"
          initialValue="1"
          rules={[{ required: true, message: '请选择审核结果' }]}
        >
          <Select onChange={(e) => selectChang(e)}>
            <Select.Option value="1">审核通过</Select.Option>
            <Select.Option value="2">审核拒绝</Select.Option>
          </Select>
        </Form.Item>
        {showReason && (
          <Form.Item
            label="拒绝原因"
            name="reason"
            rules={[{ required: true, message: '请输入拒绝原因' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
        )}
        <Form.Item label="备注" name="remark">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default examineModal;

import { message as $message, Modal, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
// api
import { getRoleList, addMember, roleAssign } from '@/api/staff';

interface Props {
  visible: boolean;
  reset: () => void;
  cancel: () => void;
}

const { TextArea } = Input;

const AddModal = ({ visible, reset, cancel }: Props) => {
  const [messageApi, contextHolder] = $message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validatorPhone = async (_rule: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入手机号');
    }
    const reg = new RegExp('^1[3456789]\\d{9}$');
    if (!reg.test(value)) {
      return Promise.reject('输入的手机号有误');
    }
    return Promise.resolve();
  };

  function getRole() {
    getRoleList({ type: 2 }).then((res) => {
      const { code, data, message } = res;
      if (code !== 0) {
        messageApi.error(message);
        return;
      }
      setOptions(
        data.map((item: any) => {
          return {
            value: item.id,
            label: item.title,
          };
        }),
      );
    });
  }

  const handleCancel = () => {
    setLoading(false);
    cancel();
    form.resetFields();
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const { phone, realName, remark, role_id } = values;
      setLoading(true);
      const { code, data, message } = await addMember({
        phone,
        realName,
        remark,
      }).catch(() => {
        setLoading(false);
        messageApi.error('添加失败');
        return;
      });
      if (code !== 0) {
        setLoading(false);
        messageApi.error(message);
        return;
      }
      roleAssign({
        user_id: data.user_id,
        role_id,
      })
        .then((res) => {
          const { code: code1, message: message1 } = res;
          if (code1 !== 0) {
            messageApi.error(message1);
            return;
          }
          messageApi.success(message1);
          reset();
          handleCancel();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    if (visible) {
      getRole();
    }
  }, [visible]);

  return (
    <>
      {contextHolder}
      <Modal
        title="添加员工"
        open={visible}
        width={640}
        destroyOnClose
        confirmLoading={loading}
        keyboard={false}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout} form={form} name="addStaff" scrollToFirstError>
          <Form.Item
            name="phone"
            label="手机号码"
            rules={[
              {
                required: true,
                validator: validatorPhone,
              },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item
            name="realName"
            label="真实姓名"
            rules={[
              {
                required: true,
                message: '请填写用户姓名',
              },
            ]}
          >
            <Input placeholder="请填写用户姓名" />
          </Form.Item>
          <Form.Item name="remark" label="员工介绍">
            <TextArea rows={4} placeholder="输入员工介绍" />
          </Form.Item>
          <Form.Item
            name="role_id"
            label="选择角色"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select placeholder="角色选择" options={options} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;

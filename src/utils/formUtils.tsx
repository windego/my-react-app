import React from 'react';
import { Form, Input, Select, Transfer } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { Rule } from 'rc-field-form/lib/interface';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { SwitchProps } from 'antd/lib/switch';
import { TransferItem, TransferProps } from 'antd/lib/transfer';
import { FormSwitch } from '@components/BaseForm';

const { Option } = Select;

interface BaseField<S> {
  name?: string & keyof S;
  label: string | React.ReactNode;
  rules?: Rule[];
  formProps?: Partial<FormItemProps>;
  show?: boolean;
}
// 输入框属性
interface InputField<S> extends BaseField<S> {
  component: 'input';
  props?: Omit<InputProps, 'name'>;
}

// 下拉框属性
interface SelectField<S> extends BaseField<S> {
  component: 'select';
  options: {
    key: string;
    value?: string | number;
    content: string | React.ReactNode;
    disabled?: boolean;
  }[];
  hasAll?: boolean;
  props?: Partial<SelectProps<any>>;
}

// switch开关
interface SwitchField<S> extends BaseField<S> {
  component: 'switch';
  props?: Omit<SwitchProps, 'onChange'>;
}

// transfer
interface TransferField<S> extends BaseField<S> {
  component: 'transfer';
  options: TransferItem[];
  props?: Omit<TransferProps, 'targetKeys' | 'dataSource' | 'listStyle'>;
}

// 自定义表单
interface CustomField<S> extends BaseField<S> {
  component: 'custom';
  render: React.ReactElement | React.ReactElement[] | null;
}

export type FormFieldConfig<S> =
  | InputField<S>
  | SelectField<S>
  | SwitchField<S>
  | CustomField<S>
  | TransferField<S>;
export function generateFormItem<Search>(config: FormFieldConfig<Search>[]): React.ReactNode {
  const renderField = (f: FormFieldConfig<Search>) => {
    switch (f.component) {
      case 'input':
        return <Input {...f.props} />;
      case 'select':
        return (
          <Select {...f.props}>
            {f.hasAll && (
              <Option key="" value="">
                全部
              </Option>
            )}
            {f.options?.map(item => (
              <Option
                key={item.key}
                value={item.value || item.key}
                disabled={item.disabled || false}
              >
                {item.content}
              </Option>
            ))}
          </Select>
        );
      case 'switch':
        return <FormSwitch {...f.props} />;
      case 'transfer':
        return <Transfer dataSource={f.options} render={item => item.title || ''} {...f.props} />;
      case 'custom':
        return f.render;
      default:
        return <Input />;
    }
  };

  return (
    <>
      {config.map((field, idx) => {
        const { show = true } = field;
        return (
          <Form.Item
            style={show ? {} : { display: 'none' }}
            key={`${idx}_${field.label}_${field.name}`}
            label={field.label}
            name={field.name}
            rules={show ? field.rules : []}
            valuePropName={field.component === 'transfer' ? 'targetKeys' : 'value'}
            {...field.formProps}
          >
            {renderField(field)}
          </Form.Item>
        );
      })}
    </>
  );
}

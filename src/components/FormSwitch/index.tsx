import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

/**
 * AntdSwitch boolean值转为 0 和 1
 */
interface FormSwitchProps extends Omit<SwitchProps, 'onChange'> {
  value?: 0 | 1;
  onChange?: (value: 0 | 1) => void;
}

const FormSwitch: React.FC<FormSwitchProps> = ({ value = 0, onChange, ...rest }) => {
  const onSwitchChange = (e: boolean) => {
    const formValue = e === true ? 1 : 0;
    if (onChange) {
      onChange(formValue);
    }
  };

  return <Switch checked={value === 1} onChange={onSwitchChange} {...rest} />;
};

export default FormSwitch;

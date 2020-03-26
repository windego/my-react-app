import React from 'react';
import { Transfer } from 'antd';
import { TransferProps } from 'antd/lib/transfer';

interface FormTransferProps extends Omit<TransferProps, 'onChange'> {
  value?: string[];
  onChange?: (value: 0 | 1) => void;
}

const FormTransfer: React.FC<FormTransferProps> = ({ value = [], onChange, ...rest }) => {
  return <Transfer />;
};

export default FormTransfer;

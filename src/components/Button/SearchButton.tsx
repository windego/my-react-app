import React from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.scss';

interface Props {
  onSubmit: () => void;
}

const SearchButton: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Button className={styles.search} icon={<SearchOutlined />} onClick={onSubmit}>
      查询
    </Button>
  );
};

export default SearchButton;

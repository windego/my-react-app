import React from 'react';
import { Row, Col } from 'antd';
import downloadIcon from '@assets/images/icon_download.svg';
import styles from './styles.scss';

interface Props {
  title: string;
  subtitle?: string;
  onDownload?: () => void;
}

const SubTitle: React.FC<Props> = ({ title, subtitle, onDownload }) => {
  return (
    <Row className={styles.titleContainer} justify="space-between">
      <Col>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </Col>
      {onDownload && (
        <Col onClick={onDownload} className={styles.download}>
          <img src={downloadIcon} width={24} alt="download" />
          <span className={styles.downloadtitle}>下载全部</span>
        </Col>
      )}
    </Row>
  );
};

export default SubTitle;

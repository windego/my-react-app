import * as React from 'react';
import { Table } from 'antd';
import { TableProps, ColumnGroupType, ColumnType } from 'antd/lib/table';

type AllColumn<T> = ColumnGroupType<T> | ColumnType<T>;

interface IBaseTableProps<Column> extends TableProps<Column> {
  // 添加children支持
  columns: AllColumn<Column>[];
  striped?: boolean;
}

const BaseTable = <ListItem extends object>(props: IBaseTableProps<ListItem>): JSX.Element => {
  const { striped = true, ...restProps } = props;
  const extraProps = {} as Partial<TableProps<ListItem>>;

  const rowClassName = (_: any, index: number): string => (index % 2 === 1 ? 'striped-row' : '');

  return (
    <Table<ListItem>
      size="small"
      className="base-table"
      rowClassName={striped ? rowClassName : () => ''}
      {...restProps}
      {...extraProps}
    />
  );
};

export default BaseTable;

import React from 'react';
import { Table, Card, Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

const BasicTable = (props) => {
  const { cardExtra, tableProps, rowKey } = props;
  function renderTip(text) {
    console.log(text, 'text')
    return (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    );
  }
  const columns = props.columns?.map((item) => {
    return {
      ellipsis: { showTitle: false }, 
      render: renderTip,
      ...item
    };
  });
  return (
    <Card
      extra={ cardExtra && cardExtra() }
      style={{width: '100%'}}
    >
      <ConfigProvider locale={zhCN}>
        <Table
          {...tableProps}
          size="small"
          bordered
          scroll={{scrollToFirstRowOnChange: true, x: '100%'}}
          width="100%"
          rowKey={rowKey}
          columns={columns}>
        </Table>
      </ConfigProvider>
    </Card> 
  )
}

export default BasicTable
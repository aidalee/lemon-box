import React, { forwardRef} from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  TreeSelect,
  Cascader
} from 'antd';
import _ from 'lodash/defaults'
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const SearchForm = forwardRef((props, ref) => {
  const { searchFormList=[], form, search, reset, initialValues={} } = props;
  const getTreeNode = (treeData) => {
    return _.map(treeData, (t, i) => {
      if (t.children) {
        return (
          <TreeNode key={t.id} value={t.id} title={t.name}>
            {getTreeNode(t.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={t.id} value={t.id} title={t.name}></TreeNode>;
    });
  };

  function filter(inputValue, path) {
    return path.some(option => {
      const label = option.label ? 'label' : option.name ? 'name' : '';
      return option[label].toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    });
  }

  const getFormItemNodes = (searchFormList) => {
    return searchFormList.map((item, i) => {
      const style = {}
      const { filterOption } = item;
      if (item.type === 'input') {
        return (
          <Col span={8} style={style} key={i}>
            <Form.Item
              label={item.label || null}
              key={i}
              name={item.name}
              rules={item.rules}
              style={{ paddingBottom: '20px' }}
            >
              <Input allowClear placeholder={item.placeholder} />
            </Form.Item>
          </Col>
        );
      } else if (item.type === 'rangedatepicker') {
        return (
          <Col span={8} style={style} key={i}>
            <Form.Item
              label={item.label || null}
              key={i}
              name={item.name}
              style={{ paddingBottom: '20px' }}
            >
              <RangePicker placeholder={item.placeholder} style={{width: '100%'}} allowClear format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        );
      } else if (item.type === 'datepicker') {
        return (
          <Col span={8} style={style} key={i}>
            <Form.Item
              label={item.label || null}
              key={i}
              name={item.name}
              style={{ paddingBottom: '20px' }}
            >
              <DatePicker style={{width: '100%'}} allowClear picker={item.picker} {...item.props} />
            </Form.Item>
          </Col>
        );
      } else if (item.type === 'select') {
        return (
          <Col span={8} style={style} key={i}>
            <Form.Item
              label={item.label || null}
              key={i}
              name={item.name}
              style={{ paddingBottom: '20px' }}
            >
              <Select
                mode={item.mode}
                maxTagCount={item.maxTagCount}
                maxTagTextLength={item.maxTagTextLength}
                placeholder={item.placeholder}
                onChange={item.onChange}
                style={{ width: item.width }}
                {...(filterOption ? { showSearch: true, filterOption } : {})}
                allowClear
                {...item.other || {}}
              >
                {item.options.map((option, index) => {
                  return (
                    <Option key={index} value={option.value}>
                      {option.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );
      } else if (item.type === 'treeselect') {
        return (
          <Col span={8} style={style} key={i}>
            <Form.Item
              label={item.label}
              key={i}
              name={item.name}
              style={{ paddingBottom: '20px' }}
            >
              <TreeSelect
                allowClear
                showSearch={true}
                treeNodeFilterProp="title"
                placeholder={item.placeholder}
                showArrow={true}
                treeLine={true && false}
                style={{ width: item.width }}
                {...item.props}
              >
                {getTreeNode(item.options)}
              </TreeSelect>
            </Form.Item>
          </Col>
        );
      } else if (item.type === 'cascader') {
        return (
          <Col span={8} style={style} key={i}>
            <Form.Item
              label={item.label}
              key={i}
              name={item.name}
              style={{ paddingBottom: '20px' }}
              rules={item.rules}
            >
              <Cascader showSearch={{ filter }}  placeholder={item.placeholder} options={item.options} fieldNames={item.fieldNames} loadData={item.loadData} onChange={item.onChange} changeOnSelect={item.changeOnSelect} />
            </Form.Item>
          </Col>
        );
      }
    });
  };
  return (
    <Form
      ref={ref}
      form={form}
      name="searchForm"
      layout="inline"
      colon={false}
      initialValues={initialValues}
    >
      <Row style={{width: '100%', marginBottom: '15px'}}>
        {getFormItemNodes(searchFormList)}
        <Col span={8}>
          <Space>
            <Button type='primary' onClick={search}>查询</Button>
            <Button type='primary' onClick={reset}>重置</Button>     
          </Space>
        </Col>
      </Row>
    </Form>
  );
});
export default SearchForm;

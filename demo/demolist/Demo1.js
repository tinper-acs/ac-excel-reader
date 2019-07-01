/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';
import { Button, Icon } from 'tinper-bee';
// 项目中引入方式
// import AcExcelReader from 'ac-excel-reader';
// demo 中引入方式
import AcExcelReader from '../../src/index';


class Demo1 extends Component {
  render() {
    // excel 列名hash 对照
    const colKeyHash = {
      order: '序号',
      level: '程度',
      component: '组件',
      solve: '解决人',
      recorder: '记录人',
      desc: '问题描述',
    };

    return (
      <div className="demoPadding">
        <AcExcelReader

          getJson={(data) => { // 获取返回json
            console.log(data);
          }}

          getArray={(data) => { // 获取返回数组
            console.log(data);
          }}

          colKeyHash={colKeyHash}

        >
          <Button shape="border">上传excel</Button>
        </AcExcelReader>
      </div>
    );
  }
}

export default Demo1;

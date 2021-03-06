/* eslint-disable no-restricted-syntax,no-prototype-builtins,react/prop-types,react/destructuring-assignment,no-shadow,react/no-unused-prop-types,react/forbid-prop-types,no-param-reassign */
import React, { Component } from 'react';

import XLSX from 'xlsx/dist/xlsx.full.min';
import PropTypes from 'prop-types';

import './index.less';


function empty() {

}


const propTypes = {
  colKeyHash: PropTypes.object, // 列名 hash 转换
  getJson: PropTypes.func, // 解析成json
  getArray: PropTypes.func, // 解析成数组
  accept: PropTypes.string, // 解析文件类型
  dateFormat: PropTypes.string, // 日期格式化
};

const defaultProps = {
  colKeyHash: {},
  getJson: empty,
  getArray: empty,
  accept: '.xlsx, .xls, .csv',
  dateFormat: 'yyyy-MM-dd',
};

class AcExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  onImportExcel = (file) => {
    const { dateFormat } = this.props;

    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);

    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result,
          {
            type: 'binary',
            cellDates: true, // 将日期类型
          });
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }

        let jsonData = data;
        const { colKeyHash } = this.props;

        // json 可以转换
        if (colKeyHash && Object.keys(colKeyHash).length > 0) {
          jsonData = data.map((row) => {
            const result = {};
            for (const item in row) {
              // 是否修改key
              let key = item;
              for (const colKey in colKeyHash) {
                if (colKeyHash[colKey] === item) {
                  key = colKey;
                  break;
                }
              }

              let cellValue = row[item];
              if (Object.prototype.toString.call(row[item]) === '[object Date]') {
                cellValue = this.formatDate(row[item], dateFormat);
              }
              result[key] = cellValue;
            }
            return result;
          });
        }


        const array = data.map((row) => {
          const result = [];
          for (const item in row) {
            let cellValue = row[item];
            if (Object.prototype.toString.call(row[item]) === '[object Date]') {
              cellValue = this.formatDate(row[item], dateFormat);
            }

            result.push(cellValue);
          }
          return result;
        });

        // json
        this.props.getJson(jsonData);
        // array
        this.props.getArray(array);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确', e);
      }
    };

    file.target.value=null;

  };


  onClickUpload = (event) => {
    const { onAllowUpload } = this.props;
    if (onAllowUpload) { // 如果有验证方法
      if (onAllowUpload()) {
        const input = event.currentTarget.children[0];
        input.click();
      }
    } else {
      const input = event.currentTarget.children[0];
      input.click();
    }

  };


  formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    };

    // 遍历这个对象
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = `${o[k]}`;
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  };

  padLeftZero = str => (`00${str}`).substr(str.length);


  render() {
    const { children, accept } = this.props;
    return (
      <span onClick={this.onClickUpload}>
        <input
          type="file"
          id="ac-upload-excel"
          accept={accept}
          style={{ display: 'none' }}
          onChange={this.onImportExcel}
        />
        <span>{children}</span>
      </span>
    );
  }
}

AcExcelReader.propTypes = propTypes;
AcExcelReader.defaultProps = defaultProps;
export default AcExcelReader;

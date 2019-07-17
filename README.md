# 前端解析 Excel文件 AcExcelReader


## 如何使用

```js
npm install ac-excel-reader --save
// 文本编辑器组件,内容展示组件, 导出pdf组件,word组件
import AcExcelReader from 'ac-excel-reader';
```

## API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|--------------
accept    | string               | .xlsx,.xls,.csv| 支持解析文件类型
colKeyHash| object               | {}           | 列名 hash 转换
getJson   | func                 | -            | 将文件解析成json
getArray  | func                 | -            | 将文件解析成数组
dateFormat| string               | yyyy-MM-dd   | 日期类型格式化


## 注意事项

暂无

## 更新日志


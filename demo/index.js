import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard';
import './demo.scss';


import Demo1 from './demolist/Demo1';

var DemoArray = [{
  'example': <Demo1/>,
  'title': ' AcExcelReader',
  'code': '/**\n *\n * @title AcExcelReader\n * @description 前端Excel解析，无需上传到后端，减少网络传输，\n *\n */\n\nimport React, { Component } from \'react\';\nimport { Button } from \'tinper-bee\';\n// 项目中引入方式\n// import AcExcelReader from \'ac-excel-reader\';\n// demo 中引入方式\nimport AcExcelReader from \'../../src/index\';\n\n\nclass Demo1 extends Component {\n  render() {\n    // excel 列名hash 对照\n    const colKeyHash = {\n      order: \'序号\',\n      level: \'程度\',\n      component: \'组件\',\n      solve: \'解决人\',\n      recorder: \'记录人\',\n      desc: \'问题描述\',\n    };\n\n    return (\n      <div className="demoPadding">\n        <AcExcelReader\n\n          getJson={(data) => { // 获取返回json\n            console.log(data);\n          }}\n\n          getArray={(data) => { // 获取返回数组\n            console.log(data);\n          }}\n\n          colKeyHash={colKeyHash} // 列名hash 对照\n          dateFormat=\'yyyy-MM-dd\' // 日期格式化\n\n        >\n          <Button shape="border">上传excel</Button>\n        </AcExcelReader>\n      </div>\n    );\n  }\n}\n\n\n',
  'desc': ' 前端Excel解析，无需上传到后端，减少网络传输，'
}];


class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  fCloseDrawer = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { title, example, code, desc, scss_code } = this.props;

    const header = (
      <div>
        <p className='component-title'>{title}</p>
        <p>{desc}</p>
        <span className='component-code' onClick={this.handleClick}> 查看源码 <i
          className='uf uf-arrow-right'/> </span>
      </div>
    );
    return (
      <Col md={12} id={title.trim()} className='component-demo'>
        <Panel header={header}>
          {example}
        </Panel>

        <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right'
                onClose={this.fCloseDrawer}>
          <div className='component-code-copy'> JS代码
            <Clipboard action="copy" text={code}/>
          </div>
          <pre className="pre-js">
                <code className="hljs javascript">{code.replace('../../src/index', COMPONENT)
                  .replace('../../src', COMPONENT)}</code>
            </pre>
          {!!scss_code ? <div className='component-code-copy copy-css'> SCSS代码
            <Clipboard action="copy" text={scss_code}/>
          </div> : null}
          {!!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{scss_code}</code>
                 </pre> : null}
        </Drawer>
      </Col>
    );
  }
}

class DemoGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        {DemoArray.map((child, index) => {

          return (
            <Demo example={child.example} title={child.title} code={child.code}
                  scss_code={child.scss_code} desc={child.desc} key={index}/>
          );

        })}
      </Row>
    );
  }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));

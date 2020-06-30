import React from 'react';
import Form01 from '../form/form01';
interface PrintProps {
  cssStyle: string;
  child: any;
}

const PrintBase = (props: any) => {
  return (
    <div className="app-main">
      <Form01 />
      <ul>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
      </ul>
    </div>
  );
};

const Print = (props: PrintProps) => {
  const print = (cssStyle: string) => {
    const targetHtml: any = window.document.querySelector('.print-iframe');

    const allHtml: any = window.document.cloneNode(true);

    allHtml.body.innerHTML = targetHtml.innerHTML + cssStyle;
    const printFrame: any = document.createElement('iframe');
    printFrame.setAttribute(
      'style',
      'visibility: hidden; height: 0; width: 0; position: absolute;'
    );
    printFrame.srcdoc = allHtml.documentElement.innerHTML;
    document.getElementsByTagName('body')[0].appendChild(printFrame);
    printFrame.contentWindow.print();
  };
  return (
    <div>
      <button
        onClick={() => {
          print(props.cssStyle);
        }}
      >
        打印
      </button>
      <div className="print-iframe">{props.child}</div>
    </div>
  );
};
const PrintShow = () => {
  const cssStyle = `
  <style>
  li {
    color: red ;
  }
</style>
                  `;
  return <Print child={<PrintBase></PrintBase>} cssStyle={cssStyle}></Print>;
};
export default PrintShow;

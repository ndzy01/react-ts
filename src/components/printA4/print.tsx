import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Form01 from '../form/form01';

const Print = (props: any, ref: any) => {
  const print = (cssStyle: string) => {
    const targetHtml: any = window.document.querySelector('.app-main');

    const allHtml: any = window.document.cloneNode(true);

    allHtml.body.innerHTML = targetHtml.innerHTML + cssStyle;
    const printFrame: any = document.createElement('iframe');
    printFrame.setAttribute(
      'style',
      'visibility: hidden; height: 0; width: 0; position: absolute;'
    );
    printFrame.srcdoc = allHtml.documentElement.innerHTML;
    document.getElementsByTagName('body')[0].appendChild(printFrame);
    console.log(printFrame);
    // printFrame.contentWindow.print();
    window.print();
  };
  useImperativeHandle(ref, () => {
    return { print };
  });
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
const PrintBase = forwardRef(Print);
const PrintShow = () => {
  const printShowRef: any = useRef();
  const cssStyle = `
  <style>
  li {
    color: red ;
  }
</style>
                  `;
  return (
    <div>
      <button
        onClick={() => {
          printShowRef.current.print(cssStyle);
        }}
      >
        打印
      </button>
      <PrintBase ref={printShowRef}></PrintBase>
    </div>
  );
};
export default PrintShow;

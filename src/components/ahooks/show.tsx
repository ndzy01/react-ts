import React from 'react';
interface PrintProps {
  title: string;
  child: any;
}

export default (props: PrintProps) => {
  return (
    <>
      <div
        style={{ margin: '5px', padding: '10px', border: '.5px dashed  pink' }}
      >
        <h2>{props.title}</h2>
        {props.child}
      </div>
    </>
  );
};

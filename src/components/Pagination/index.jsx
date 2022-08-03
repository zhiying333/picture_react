import React, { useState } from 'react';
import { Pagination } from 'antd';

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

export default function PaginationCom() {

  const [defaultCurrent, setDefaultCurrent] = useState(1);
  const [total, setTotal] = useState(20);

  const handlerChange = (page, pageSize) => {
    console.log('改变分页数据', page, pageSize);
  }

  return (
    <div>
      <Pagination
        // showSizeChanger
        // onShowSizeChange={onShowSizeChange}
        hideOnSinglePage={true}
        pageSize={10}
        defaultCurrent={defaultCurrent}
        total={total}
        onChange={handlerChange}
        style={{
          float: 'right',
          margin: '0 30px'
        }}
      />
    </div>
  )
}

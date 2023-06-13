import React from 'react';
import style from '../styles/result.module.css';

const result: React.FC = () => {
  const backgroundImage = `url("/backimg.svg")`; // パスの指定方法に修正

  return (
    <div className={style.container}>
      <div className={style.backgroundImage} style={{backgroundImage}}>
        <div className={style.result_area}>
          <p>お会計：</p>
          <p>ランキング：</p>
        </div>
      </div>
    </div>
  );
};

export default result;
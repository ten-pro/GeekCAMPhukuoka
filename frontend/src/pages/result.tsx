import React, { useState } from 'react';
import style from '../styles/result.module.css';


const result: React.FC = () => {
  const backgroundImage = `url("/backimg.svg")`; // パスの指定方法に修正
  const [money,setMoney] = useState<number>(1000);
  const [rank,setRank] = useState<number>(0);

  return (
    <div className={style.container}>
      <div className={style.backgroundImage} style={{backgroundImage}}>
        <div className={style.result_area}>
          <h3 className={style.h3}>お会計：{money}円</h3>
          <h3 className={style.h3}>ランキング：{rank}位</h3>
          <div className={style.content}>
            <div className={style.mentai_area}>
              <img src='./img/mentaiko.svg' className={style.mentaiko}/>
              <p className={style.mentai_p}>1000円　×　10</p>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.ramen_area}>
              <img src='./img/ramen.svg' className={style.ramen}/>
              <p className={style.ramen_p}>1000円　×　10</p>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.motu_area}>
              <img src='./img/motu.svg' className={style.motu}/>
              <p className={style.motu_p}>1000円　×　10</p>
            </div>
          </div>
          <div className={style.btn_area}>
            <div className={style.restart_area}>
              <p className={style.restart}>ReSTART</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default result;
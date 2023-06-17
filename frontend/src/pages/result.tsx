import React, { useState,useEffect } from 'react';
import style from '../styles/result.module.css';
import axios from 'axios';


const result: React.FC = () => {
  const backgroundImage = `url("/backimg.svg")`; // パスの指定方法に修正
  const [money,setMoney] = useState<number>(1000);
  const [rank,setRank] = useState<number>(100);
  const [username,setUsername] = useState<string>('testname1');
  const [ichigo,setIchigo] = useState<number>(0);
  const [motu,setMotu] = useState<number>(0);
  const [gobou,setGobou] = useState<number>(0);
  const [other,setOther] = useState<number>(0);

  useEffect(() => {

    let strbery = 500 * ichigo;
    let udon = 500 * gobou;
    let motuu = 3000 * motu;
    let sonota = 100 * other;
    let sum = strbery + udon + motuu + sonota;
    setMoney(sum);
    try{
    axios
      .post('http://mp-class.chips.jp/pinball/Main.php', {
        create_rank:'',
          user_name:username,
          score:sum,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(function (response) {
        if (response.data === false) {
          // userData.error1 = true;
        } else {
          console.log(response.data);
          setRank(response.data.rank);
        }
      })
    }catch(e){
      console.log(e);
    }
  }, [setRank])

  const restart = () =>{
    window.location.href='/main';
  }

  

  return (
    <div className={style.container}>
      <div className={style.backgroundImage} style={{backgroundImage}}>
        <div className={style.result_area}>
          <h3 className={style.h3}>お会計：{money}円</h3>
          <h3 className={style.h32}>ランキング：{rank}位</h3>
          <div className={style.content}>
            <div className={style.mentai_area}>
              <img src='./image/icigo.svg' className={style.mentaiko}/>
              <p className={style.mentai_p}>500円　×　{ichigo}</p>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.ramen_area}>
              <img src='./img/ramen.svg' className={style.ramen}/>
              <p className={style.ramen_p}>500円　×　{gobou}</p>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.motu_area}>
              <img src='./image/men2.svg' className={style.motu}/>
              <p className={style.motu_p}>3000円　×　{motu}</p>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.motu_area}>
              <p className={style.p1}>その他</p>
              <p className={style.p2}>100円　×　{other}</p>
            </div>
          </div>
          <div className={style.btn_area}>
            <div className={style.restart_area} onClick={restart}>
              <p className={style.restart}>ReSTART</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default result;
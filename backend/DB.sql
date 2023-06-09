//ランクテーブル
CREATE TABLE ranking_tbl(
    rank_id         INT             AUTO_INCREMENT  ,
    score           INT(50)         NOT NULL        ,
    user_name       VARCHAR(100)    NOT NULL        ,
    PRIMARY KEY     (rank_id)
);



//お店テーブル
CREATE TABLE shop_tbl(
    shop_id         INT             AUTO_INCREMENT  ,
    shop_name       VARCHAR(100)    NOT NULL        ,
    shop_place      VARCHAR(200)    NOT NULL        ,
    shop_url        VARCHAR(200)    NOT NULL        ,
    PRIMARY KEY     (shop_id)
);
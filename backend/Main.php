<?php

//CROSエラーの解消
header("Access-Control-Allow-Origin: *");
//JSON形式で返却すること、文字形式がUTF-8だということの宣言
header('Content-Type: application/json; charset=UTF-8');

//DAOの読み込み
require_once './RankDAO.php';

$data = '引数が存在しません';

//create_rankの引数がある時の処理
if (isset($_POST['create_rank']) == true) {
    $class = new Rank();
    $data = $class->create_talk($_POST['score'],$_POST['user_name']);
}




//arrayの中身をJSON形式に変換している
$json_array = json_encode($data);

print $json_array;
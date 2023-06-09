<?php

class Rank
{
    function get_pdo()
    {
        $pdo = new PDO('mysql:host=mysql215.phy.lolipop.lan;dbname=LAA1418138-pinball;charset=utf8', 'LAA1418138', 'apstdnb');
        return $pdo;
    }

    function create_talk($score, $name)
    {
        try {
            $pdo = $this->get_pdo();
            $sql = "INSERT INTO ranking_tbl (score, user_name) VALUES (?, ?);";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $score, PDO::PARAM_INT);
            $ps->bindValue(2, $name, PDO::PARAM_STR);
            $ps->execute();

            $id = $pdo->lastInsertId();
            $rank = $this->get_rank($score, $id);

            $data = array("status" => "created", "rank" => $rank);
        } catch (Exception $e) {
            $data = $e->getMessage();
        } catch (PDOException $e) {
            $data = $e->getMessage();
        }
        return $data;
    }

    function get_rank($score, $id)
    {
        try {
            $pdo = $this->get_pdo();
            $sql = "SELECT COUNT(*) AS rank FROM ranking_tbl WHERE score > ? OR (score = ? AND rank_id < ?);";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1, $score, PDO::PARAM_INT);
            $ps->bindValue(2, $score, PDO::PARAM_INT);
            $ps->bindValue(3, $id, PDO::PARAM_INT);
            $ps->execute();
            $row = $ps->fetch(PDO::FETCH_ASSOC);

            // We add 1 because rank should start from 1, not 0
            return $row['rank'] + 1;
        } catch (Exception $e) {
            $data = $e->getMessage();
        } catch (PDOException $e) {
            $data = $e->getMessage();
        }
        return $data;
    }
}
<?
header("Access-Control-Allow-Origin: *");
require("mysql.php");
$game = strip_tags(mysql_real_escape_string($_GET['g'])); //game index number
$number = strip_tags(mysql_real_escape_string($_GET['n'])); //number of highscores to get
$direction = strip_tags(mysql_real_escape_string($_GET['c'])); //whether to sort ascending (0) or descending (1).
if (!is_numeric($game) || !is_numeric($number) || !is_numeric($direction))
{
    $cheat = true;
}
if ($cheat)
{
    echo "-2";
}
else
{
    if ($direction == 0)
    {
      $order = "asc";
    }
    else
    {
      $order = "desc";
    }
    $result = mysql_query('select * from highscorest01 where gamed01 = '.$game.' order by scored01 '.$order.' limit '.$number);
    while ($row = mysql_fetch_array($result))
    {
      echo $row['named01']."|".$row['scored01']."|";
    }
}
?>
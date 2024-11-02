<?
header("Access-Control-Allow-Origin: *");
require("mysql.php");
$code = strip_tags(mysql_real_escape_string($_GET['c']));
$game = strip_tags(mysql_real_escape_string($_GET['g']));
$name = strip_tags(mysql_real_escape_string($_GET['n']));
$result = mysql_query('select keyd01 from gamet01 where idd01 = '.$game);
$row = mysql_fetch_array($result);
$key = $row['keyd01'];
$codetemp = $code;
$new = "";
$ii = 0;
$chars[14] = "1";
$chars[13] = "9";
$chars[12] = "3";
$chars[11] = "7";
$chars[10] = "4";
$chars[9] = "|";
$chars[8] = "6";
$chars[7] = "5";
$chars[6] = ".";
$chars[5] = "2";
$chars[4] = "0";
$chars[3] = "8";
$chars[2]= ":";
$chars[1] = ";";
$chars[0] = ",";
while ($codetemp != "")
{
    $temp = substr($codetemp, 0, 1);
    $list=strrev($key);
    $pos = strpos($list, $temp);
    if ($pos === FALSE)
    {
        $cheat = true;
    }
    $temp = $chars[(($pos+$ii+1) % 15)];
    $new .= $temp;
    $codetemp = substr($codetemp, 1);
    $ii++;
}
if (!is_numeric($game))
{
    $cheat = true;
}
if (!is_numeric($new))
{
    $cheat = true;
}
if ($cheat)
{
    echo "2";
}
else
{
    $result = mysql_query('insert into highscorest01 set gamed01 = '.$game.', scored01 = '.$new.', coded01 = "'.$code.'", named01 = "'.$name.'"');
    if ($result)
    {
        echo "1";
    }
    else
    {
        echo "0";
    }
}
?>
<?
//X Y and Z are details you need to get from your host
$dbHost = "X";
$dbUser = "Y";
$dbPass = "Z";
$dbDatabase = "html5_db";
$db = mysql_connect("$dbHost", "$dbUser", "$dbPass") or die ("Error connecting to database."); 
mysql_select_db($dbDatabase);
?>
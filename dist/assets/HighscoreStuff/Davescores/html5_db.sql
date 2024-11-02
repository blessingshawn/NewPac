-- phpMyAdmin SQL Dump
-- version 3.4.7.1
-- http://www.phpmyadmin.net
--
-- Host: database.db
-- Generation Time: Nov 21, 2011 at 08:54 PM
-- Server version: 5.0.87
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `html5db`
--

-- --------------------------------------------------------

--
-- Table structure for table `gamet01`
--

CREATE TABLE IF NOT EXISTS `gamet01` (
  `idd01` int(11) NOT NULL auto_increment,
  `named01` text NOT NULL,
  `keyd01` text NOT NULL,
  `timed01` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`idd01`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Table structure for table `highscorest01`
--

CREATE TABLE IF NOT EXISTS `highscorest01` (
  `idd01` int(11) NOT NULL auto_increment,
  `gamed01` int(11) NOT NULL,
  `scored01` int(11) NOT NULL,
  `coded01` text NOT NULL,
  `named01` text NOT NULL,
  `timestampd01` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`idd01`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2304 ;


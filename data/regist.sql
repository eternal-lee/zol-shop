-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-15 04:24:55
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `regist`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `adminID` int(20) UNSIGNED NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `num` int(20) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`adminID`, `username`, `password`, `email`, `num`) VALUES
(1, '123', '456', NULL, 2),
(3, '321', '654', NULL, 4),
(4, '1111', '321', '321@qq.com', 1),
(5, '123', '456', '1323@qq.com', 2),
(6, '13101010113', '666666', '145@qq.com', 1);

-- --------------------------------------------------------

--
-- 表的结构 `loginuser`
--

CREATE TABLE `loginuser` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL,
  `number` int(11) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `loginuser`
--

INSERT INTO `loginuser` (`id`, `username`, `pwd`, `number`) VALUES
(8, '13222222222', '123456', 1),
(9, '18381306207', '123456', 14),
(10, '13333333333', '123456', 1),
(11, '15989565464', '321654', 1),
(12, '13422222222', '123456', 1),
(13, '13344444444', '321654', 1);

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `goodsID` int(50) NOT NULL,
  `goodsName` varchar(50) DEFAULT NULL,
  `goodsType` varchar(50) DEFAULT NULL,
  `goodsNum` int(100) DEFAULT NULL,
  `goodsInfo` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`goodsID`, `goodsName`, `goodsType`, `goodsNum`, `goodsInfo`) VALUES
(1, '45', 'fsd', 45, 'df'),
(1223, 'sd', 'sdas', 5, 'sad\r\n'),
(12, 'ä¹°ä¹°é…’', 'é¥®æ–™', 15, 'aaaa'),
(2, 'dfddd', 'ttt', 31, 'dcsd\r\n'),
(5, 'æ¢¨å­', 'æ°´æžœ', 34, 'sa'),
(15, '165', '156', 6, '5'),
(9, 'df', 'fsdf', 54, 'sdd'),
(45, '654ds', 'fsdf', 4156, 'dcs'),
(54, 'sdas', 'æ°´æžœ', 12, 'sdf'),
(23, 'dsfsd', 'ddfff', 1, 'ds');

-- --------------------------------------------------------

--
-- 表的结构 `register`
--

CREATE TABLE `register` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `register`
--

INSERT INTO `register` (`id`, `user`, `pwd`) VALUES
(3, '18381306207', '123456'),
(2, '13222222222', '234'),
(4, '13333333333', '123456'),
(5, '15989565464', '321654'),
(6, '13101010112', '654321'),
(7, '14', '5465'),
(8, '13422222222', '123456'),
(9, '13433333333', '165'),
(10, '13344444444', '321654');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`),
  ADD UNIQUE KEY `adminID` (`adminID`);

--
-- Indexes for table `loginuser`
--
ALTER TABLE `loginuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`goodsID`),
  ADD UNIQUE KEY `商品ID` (`goodsID`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `adminID` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `loginuser`
--
ALTER TABLE `loginuser`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- 使用表AUTO_INCREMENT `register`
--
ALTER TABLE `register`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

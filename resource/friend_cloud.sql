-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 30, 2012 at 06:13 PM
-- Server version: 5.5.28
-- PHP Version: 5.3.10-1ubuntu3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `friend_cloud`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `city_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `country_id` mediumint(8) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `fk_city_country` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `status_id` mediumint(8) DEFAULT NULL,
  `friend_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_status` (`status_id`),
  KEY `fk_comment_friend` (`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE IF NOT EXISTS `country` (
  `country_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `country` varchar(45) DEFAULT 'np',
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE IF NOT EXISTS `friend` (
  `friend_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `friend_user_id` mediumint(8) DEFAULT NULL,
  `is_subscriber` tinyint(1) NOT NULL DEFAULT '1',
  `privacy` tinyint(3) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` mediumint(8) NOT NULL,
  `friend_list_id` smallint(5) DEFAULT NULL,
  PRIMARY KEY (`friend_id`),
  KEY `fk_friend_user` (`user_id`),
  KEY `fk_friend_friend_list` (`friend_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `friend_list`
--

CREATE TABLE IF NOT EXISTS `friend_list` (
  `friend_list_id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `privacy` tinyint(3) NOT NULL DEFAULT '0',
  `friend_id` mediumint(8) DEFAULT NULL,
  `user_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`friend_list_id`),
  KEY `fk_friend_list_friend` (`friend_id`),
  KEY `fk_friend_list_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `message` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `is_spam` tinyint(1) NOT NULL DEFAULT '0',
  `to` mediumint(8) DEFAULT NULL,
  `isreply` tinyint(1) DEFAULT '0',
  `user_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `fk_message_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `nickname`
--

CREATE TABLE IF NOT EXISTS `nickname` (
  `nickname_id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) DEFAULT NULL,
  `privacy` tinyint(3) NOT NULL DEFAULT '0',
  `user_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`nickname_id`),
  KEY `fk_nickname_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `msg` varchar(255) DEFAULT NULL,
  `type` smallint(5) DEFAULT NULL,
  `privacy` tinyint(3) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `user_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `fk_activity_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `privacy`
--

CREATE TABLE IF NOT EXISTS `privacy` (
  `privacy_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `profile` tinyint(3) NOT NULL DEFAULT '1',
  `address` tinyint(3) NOT NULL DEFAULT '2',
  `status` tinyint(3) NOT NULL DEFAULT '1',
  `bookmark` tinyint(3) NOT NULL DEFAULT '1',
  `feed` tinyint(3) NOT NULL DEFAULT '1',
  `activity` tinyint(3) NOT NULL DEFAULT '1',
  `friend` tinyint(3) NOT NULL DEFAULT '1',
  `friend_list` tinyint(3) NOT NULL DEFAULT '0',
  `nickname` tinyint(3) NOT NULL DEFAULT '1',
  `user_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`privacy_id`),
  KEY `fk_privacy_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `privacy_type`
--

CREATE TABLE IF NOT EXISTS `privacy_type` (
  `privacy_type_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`privacy_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE IF NOT EXISTS `profile` (
  `user_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `token` mediumint(5) NOT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `name_first` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `name_middle` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name_last` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `email_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '/web/image/default.jpg',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `online` tinyint(3) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `token`, `username`, `password`, `name_first`, `name_middle`, `name_last`, `email_id`, `picture`, `active`, `online`, `created_at`) VALUES
(1, 0, 'rkjha.it.in@gmail.com', '', 'Rajesh', 'Kumar', 'Jha', 'rkjha.it.in@gmail.com', 'default.png', 1, 1, '2012-12-30 11:51:48'),
(2, 0, 'rkjha.it.in@gmail.com', '', 'Rakesh', 'Kumar', 'Jha', 'rkjha.it.in@gmail.com', 'default.png', 1, 1, '2012-12-30 11:51:48'),
(3, 0, 'rkjha.it.in@gmail.com', '', 'Rakesh', 'Kumar', 'Jha', 'rkjha.it.in@gmail.com', '/web/image/default.jpg', 1, 1, '2012-12-30 11:40:43'),
(4, 0, 'rkjha.it.in@gmail.com', '', 'Pushparaj', 'Chandan', '', 'rkjha.it.in@gmail.com', '/web/image/default.jpg', 1, 1, '2012-12-30 11:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `status_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `thumbs_up` smallint(5) DEFAULT NULL,
  `thumbs_down` smallint(5) DEFAULT NULL,
  `privacy` tinyint(3) NOT NULL DEFAULT '0',
  `is_reply` tinyint(1) NOT NULL DEFAULT '0',
  `to_fb` tinyint(1) NOT NULL DEFAULT '0',
  `to_twitter` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` mediumint(8) NOT NULL,
  PRIMARY KEY (`status_id`),
  KEY `fk_status_reply_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `thumb_up_down`
--

CREATE TABLE IF NOT EXISTS `thumb_up_down` (
  `thumb_up_down_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `flag` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `status_id` mediumint(8) DEFAULT NULL,
  `friend_id` mediumint(8) DEFAULT NULL,
  PRIMARY KEY (`thumb_up_down_id`),
  KEY `fk_thumb_up_down_status` (`status_id`),
  KEY `fk_thumb_up_down_friend` (`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `fk_city_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_friend` FOREIGN KEY (`friend_id`) REFERENCES `friend` (`friend_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `fk_friend_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_friend_friend_list` FOREIGN KEY (`friend_list_id`) REFERENCES `friend_list` (`friend_list_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `friend_list`
--
ALTER TABLE `friend_list`
  ADD CONSTRAINT `fk_friend_list_friend` FOREIGN KEY (`friend_id`) REFERENCES `friend` (`friend_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_friend_list_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_message_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `nickname`
--
ALTER TABLE `nickname`
  ADD CONSTRAINT `fk_nickname_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `privacy`
--
ALTER TABLE `privacy`
  ADD CONSTRAINT `fk_privacy_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `status`
--
ALTER TABLE `status`
  ADD CONSTRAINT `fk_status_reply_user` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `thumb_up_down`
--
ALTER TABLE `thumb_up_down`
  ADD CONSTRAINT `fk_thumb_up_down_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_thumb_up_down_friend` FOREIGN KEY (`friend_id`) REFERENCES `friend` (`friend_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

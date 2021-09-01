CREATE SCHEMA IF NOT EXISTS `dka` DEFAULT CHARACTER SET utf8 ;
USE `dka` ;

-- -----------------------------------------------------
-- Table `dka`.`calendar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dka`.`calendar` ;

CREATE TABLE IF NOT EXISTS `dka`.`calendar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `details` LONGTEXT NOT NULL,
  `dtime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id`)
ENGINE = InnoDB;
-- MAX(date)


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

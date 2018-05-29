SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `medicine` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `medicine` ;

-- -----------------------------------------------------
-- Table `medicine`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  `verfication` VARCHAR(45) NULL COMMENT '验证码',
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
COMMENT = '用户表 存储用户信息';


-- -----------------------------------------------------
-- Table `medicine`.`role_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`role_menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `menuno` VARCHAR(45) NULL COMMENT '菜单编号',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '角色对应的菜单';


-- -----------------------------------------------------
-- Table `medicine`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `menu_permission` VARCHAR(45) NULL,
  `role_menu_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `role_id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `role_name_UNIQUE` (`name` ASC),
  INDEX `fk_roles_role_menu1_idx` (`role_menu_id` ASC),
  CONSTRAINT `fk_roles_role_menu1`
    FOREIGN KEY (`role_menu_id`)
    REFERENCES `medicine`.`role_menu` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medicine`.`manufacturer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`manufacturer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL COMMENT '厂商名称',
  `product_address` VARCHAR(45) NULL COMMENT '生产地址',
  `postal_code` VARCHAR(45) NULL COMMENT '邮政编码',
  `phone_num` VARCHAR(45) NULL COMMENT '联系电话',
  `fax_no` VARCHAR(45) NULL COMMENT '传真号码',
  `register_address` VARCHAR(45) NULL COMMENT '药品生产许可证注册地址',
  `website` VARCHAR(45) NULL COMMENT '网址',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '制造商';


-- -----------------------------------------------------
-- Table `medicine`.`providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`providers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `phone_num` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '供应商信息';


-- -----------------------------------------------------
-- Table `medicine`.`drug_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`drug_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `store_flag` VARCHAR(5) NOT NULL DEFAULT 0 COMMENT '是否入库 0: 未批准入库  1:批准入库',
  `unit_price` DECIMAL(10,3) NOT NULL,
  `manufacturer_id` INT NOT NULL,
  `providers_id` INT NOT NULL,
  `quantity` VARCHAR(45) NULL COMMENT '某类药品数量',
  `smalllest_unit` VARCHAR(45) NULL COMMENT '药品规格的最小单位',
  `scale` INT NULL COMMENT '最小单位和规格之间的关系',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_drug_info_manufacturer1_idx` (`manufacturer_id` ASC),
  INDEX `fk_drug_info_providers1_idx` (`providers_id` ASC),
  CONSTRAINT `fk_drug_info_manufacturer1`
    FOREIGN KEY (`manufacturer_id`)
    REFERENCES `medicine`.`manufacturer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_drug_info_providers1`
    FOREIGN KEY (`providers_id`)
    REFERENCES `medicine`.`providers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '药品信息(非医药信息)';


-- -----------------------------------------------------
-- Table `medicine`.`package_insert`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`package_insert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `drug_info_id` INT NOT NULL,
  `type` INT NULL COMMENT '类型:处方药:0:化学药品 1:治疗用生物制品 非处方药:2:化学药品 3:中成药',
  `approval_date` DATE NULL COMMENT '核准日期',
  `identification` VARCHAR(45) NULL COMMENT '特殊/外用药品标识',
  `alter_date` DATE NULL COMMENT '修改日期',
  `advice` VARCHAR(45) NULL COMMENT '忠告语',
  `warning` VARCHAR(45) NULL COMMENT '警告语',
  `medicine_name` VARCHAR(45) NULL COMMENT '药品名称',
  `common_name` VARCHAR(45) NULL COMMENT '通用名称',
  `product_name` VARCHAR(45) NULL COMMENT '商品名称',
  `english_name` VARCHAR(45) NULL COMMENT '英文名称',
  `chinese_name` VARCHAR(45) NULL COMMENT '汉语拼音',
  `elements` VARCHAR(45) NULL COMMENT '成分',
  `character` VARCHAR(45) NULL COMMENT '性状',
  `adaptation_disease` VARCHAR(45) NULL COMMENT '适应症/功能主治',
  `specification` VARCHAR(45) NULL COMMENT '规格',
  `dosage_administration` VARCHAR(45) NULL COMMENT '用法用量',
  `medicine_specificationcol` VARCHAR(45) NULL,
  `untoward` VARCHAR(45) NULL COMMENT '不良反应',
  `taboo` VARCHAR(45) NULL COMMENT '禁忌',
  `notes` VARCHAR(45) NULL COMMENT '注意事项',
  `drug_interaction` VARCHAR(45) NULL COMMENT '药物相互作用',
  `pharmacologic_effect` VARCHAR(45) NULL COMMENT '药理作用',
  `storage` VARCHAR(45) NULL COMMENT '贮藏(条件)',
  `packaging` VARCHAR(45) NULL COMMENT '直接接触药品的药包材（注册证名称或标准名称）+上市销售最小包装规格（不同包装规格使用不同说明书）',
  `manufacture_date` DATE NULL COMMENT '生产日期',
  `validity_date` VARCHAR(45) NULL COMMENT '有效期',
  `loss_efficacy_date` DATE NULL COMMENT '失效日期',
  `standard` VARCHAR(45) NULL COMMENT '执行标准',
  `approval_num` VARCHAR(10) NULL COMMENT '批准文号',
  `revise_date` DATE NULL COMMENT '说明书修订日期',
  `manufacturer` VARCHAR(45) NULL COMMENT '生产企业',
  `pregnant_woman` VARCHAR(45) NULL COMMENT '孕妇及哺乳期妇女用药',
  `children` VARCHAR(45) NULL COMMENT '儿童用药',
  `agedness` VARCHAR(45) NULL COMMENT '老年用药',
  `clinical_test` VARCHAR(45) NULL COMMENT '临床试验',
  PRIMARY KEY (`id`),
  INDEX `fk_medicine_specification_drug_info1_idx` (`drug_info_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_medicine_specification_drug_info1`
    FOREIGN KEY (`drug_info_id`)
    REFERENCES `medicine`.`drug_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '药品说明书';


-- -----------------------------------------------------
-- Table `medicine`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`user_role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `roles_id` INT NOT NULL,
  INDEX `fk_user_role_users1_idx` (`users_id` ASC),
  INDEX `fk_user_role_roles2_idx` (`roles_id` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_user_role_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `medicine`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role_roles2`
    FOREIGN KEY (`roles_id`)
    REFERENCES `medicine`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medicine`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `quatity` VARCHAR(45) NULL COMMENT '购买数量',
  `smallest_unit` VARCHAR(45) NULL COMMENT '规格之外的最小单位',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '客户信息';


-- -----------------------------------------------------
-- Table `medicine`.`expense_calender`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medicine`.`expense_calender` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `consumption_date` DATE NULL COMMENT '消费时间',
  `discount_price` DECIMAL(10,2) NULL COMMENT '折扣率',
  `drug_info_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_expense_calender_drug_info1_idx` (`drug_info_id` ASC),
  INDEX `fk_expense_calender_customer1_idx` (`customer_id` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_expense_calender_drug_info1`
    FOREIGN KEY (`drug_info_id`)
    REFERENCES `medicine`.`drug_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_expense_calender_customer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `medicine`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '消费记录';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

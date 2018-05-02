package com.medicine.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.medicine.service.IMedicineService;

@Controller
@RequestMapping("medicineController")
public class MedicineController{
	@Resource(name="medicineService")
	private IMedicineService medicineService;
}

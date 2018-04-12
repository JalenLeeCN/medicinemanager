package com.medicine.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.dto.TestScope;
import com.medicine.service.Service;

@Controller
@RequestMapping("/test")
public class TestController {
	@Resource(name="serviceImpl")
	private Service serviceImpl;
	
	@RequestMapping("/test")
	@ResponseBody
	public List<TestScope> getDatatest(){
		return this.serviceImpl.getDataTest();
	}
}

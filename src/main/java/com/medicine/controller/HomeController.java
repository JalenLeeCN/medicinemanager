package com.medicine.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.medicine.service.IHomeService;

@Controller
@RequestMapping("home")
public class HomeController {
	@Resource(name="homeService")
	private IHomeService homeService;
	
	@RequestMapping("/roleStatistics")
	@ResponseBody
	public List<Map> roleStatistics(){
		return this.homeService.roleStatistics();
	}
}

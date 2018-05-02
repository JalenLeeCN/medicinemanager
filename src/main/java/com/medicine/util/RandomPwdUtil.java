package com.medicine.util;

import java.util.Random;

import org.apache.ibatis.ognl.ElementsAccessor;
import org.springframework.stereotype.Component;

@Component("randomPwdUtil")
public class RandomPwdUtil {
	// 62
	final static String[] ELEMENTS = new String[] { "a", "b", "c", "d", "r", "f", "g", "h", "i", "g", "k", "l", "m",
			"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H",
			"I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",
			"3", "4", "5", "6", "7", "8", "9" };

	/**
	 * 产生随机密码
	 * 
	 * @return 8位密码 大小写敏感
	 */
	public String rdmPwdProducer() {
		StringBuffer sb = new StringBuffer();
		Random r = new Random();
		for (int i = 0; i < 8; i++)
			sb.append(ELEMENTS[r.nextInt(62)]);
		return sb.toString();
	}

}

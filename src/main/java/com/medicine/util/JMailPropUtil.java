package com.medicine.util;

import java.io.IOException;
import java.util.Properties;

/**
 * 读取配置文件工具
 * 
 * @author LZZ
 *
 */
public class JMailPropUtil {
	private static Properties props = new Properties();
	/**
	 * 读取.properties文件
	 */
	static {
		try {
			props.load(JMailPropUtil.class.getClassLoader().getResourceAsStream("config/jmail.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 通过key读取value
	 * 
	 * @param key
	 * @return
	 */
	public static String getValue(String key) {
		return props.getProperty(key);
	}
}

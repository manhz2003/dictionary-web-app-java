//package com.example.dictionaryapplication.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//
//import java.util.Properties;
//
//@Configuration
//public class MailConfig {
//
//    @Bean
//    public JavaMailSender javaMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//        mailSender.setHost("smtp.gmail.com"); // Update this to your email SMTP host
//        mailSender.setPort(587); // Port của email server
//        mailSender.setUsername("manhthenguyen2003@gmail.com"); // Tên đăng nhập email
//        mailSender.setPassword("0987739823asD"); // Mật khẩu email
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.smtp.auth", "true"); // Xác thực SMTP
//        props.put("mail.smtp.starttls.enable", "true"); // Kích hoạt TLS
//
//        return mailSender;
//    }
//}

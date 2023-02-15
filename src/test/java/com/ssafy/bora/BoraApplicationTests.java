package com.ssafy.bora;

import org.assertj.core.api.Assertions;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

//@SpringBootTest
class BoraApplicationTests {

    @Test
    void jasypt(){
        String url = "jdbc:mariadb://i8b301.p.ssafy.io:8306/bora?serverTimezone=UTC&characterEncoding=UTF-8";
        String username = "ssafy";
        String password = "ssafi";

//        String encryptUrl = jasyptEncrypt(host);
//        String encryptUsername = jasyptEncrypt(port);
//        String encryptPassword = jasyptEncrypt(pwd);

//        System.out.println("encryptUrl : " + encryptUrl);
//        System.out.println("encryptUsername : " + encryptUsername);
//        System.out.println("encryptPassword : " + encryptPassword);

    }

    private String jasyptEncrypt(String input) {
        String key="0836895";
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.encrypt(input);
    }

    private String jasyptDecryt(String input){
        String key="0836895";
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.decrypt(input);
    }
}
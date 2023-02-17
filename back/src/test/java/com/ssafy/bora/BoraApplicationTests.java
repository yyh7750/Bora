package com.ssafy.bora;

import org.assertj.core.api.Assertions;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

//@SpringBootTest
class BoraApplicationTests {

    @Test
    void jasypt(){
        String username = "jdbc:mariadb://i8b301.p.ssafy.io:8306/bora?serverTimezone=UTC&characterEncoding=UTF-8";
        String password = "C+Yr0KXoLDfUle5sPJ1B+LPlL1RylDgRl6F+IK48";

        String encryptUrl = jasyptEncrypt(username);
        String encryptUsername = jasyptEncrypt(password);

        System.out.println("encryptUrl : " + encryptUrl);
        System.out.println("encryptUsername : " + encryptUsername);

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
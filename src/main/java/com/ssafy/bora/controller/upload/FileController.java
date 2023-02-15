package com.ssafy.bora.controller.upload;

import com.ssafy.bora.service.fileupload.FileUploadService;
import com.ssafy.bora.service.user.impl.UserServiceImpl;
import com.ssafy.bora.util.CookieUtils;
import com.ssafy.bora.vo.FileVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/img")
public class FileController {
    @Autowired
    private final FileUploadService fileUploadService;
    private final CookieUtils cookieUtils;
    private final UserServiceImpl userService;


    @PostMapping("/file-upload")

    public ResponseEntity<?> FileUpload(@RequestParam("file") MultipartFile file, @RequestParam String userId) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }


        log.info("file 들어 왔는가 ?:{}",file );
        Map<String, String> authInfo = new HashMap<>();

        FileVO fileVO = fileUploadService.fileUpload(file,userId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}

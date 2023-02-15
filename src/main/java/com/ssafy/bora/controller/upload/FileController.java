package com.ssafy.bora.controller.upload;

import com.ssafy.bora.service.fileupload.FileUploadService;
import com.ssafy.bora.vo.FileVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final FileUploadService fileUploadService;

    @PostMapping("/file-upload")

    public ResponseEntity<?> FileUpload(@RequestParam("file") MultipartFile file, @RequestParam String userId) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        log.info("file 들어 왔는가 ?:{}",file );
        Map<String, String> authInfo = new HashMap<>();

        FileVO fileVO = fileUploadService.fileUpload(file,userId);

        return new ResponseEntity<>(fileVO, HttpStatus.CREATED);
    }
}
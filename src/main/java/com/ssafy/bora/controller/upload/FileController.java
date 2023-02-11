package com.ssafy.bora.controller.upload;

import com.ssafy.bora.service.fileupload.FileUploadServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class FileController {
    private final FileUploadServiceImpl fileUploadService;

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile multipartFile) throws IOException{
        String fileName = fileUploadService.fileUpload(multipartFile);
        return fileName;
    }
}

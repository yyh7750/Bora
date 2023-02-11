package com.ssafy.bora.service.fileupload;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import static com.ssafy.bora.config.AwsS3DirectoryName.BANNER_FILE;
import static com.ssafy.bora.config.AwsS3DirectoryName.DEFAULT_BANNER;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class FileUploadServiceImpl {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 파일을 업로드하는 메서드
    public String fileUpload(MultipartFile multipartFile) throws IOException {

        // S3에 저장된 파일의 URL이다.
        String storeFileUrl = ""; //AWS S3 이미지 url

        // 멀티파트의 크기가 0이라면 디폴트 경로를 StoreURL에 디폴트 경로를 storeFileUrl에 저장한다.
        if (multipartFile.getSize() == 0) {
            storeFileUrl = DEFAULT_BANNER;
        }
        // 멀티 파트의 파일의 크기가 0이 아니라면 s3에 저장.
        else {
            /*파일 저장*/
            // ObjectMetadata : 파일의 메타이터(종류와 크기)를 저장하는 객체이다.
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getSize());

            // OriginFileName 파일의 원래 이름을 가져온다.
            String originFileName = multipartFile.getOriginalFilename();

            // originFileName에서 마지막에 나타난 "."을 찾는다.
            // 결과는 정수 값으로 index에 저장된다.
            int index = originFileName.lastIndexOf(".");

            // ext : 파일의 확장자 정보를 가져온다.
            String ext = originFileName.substring(index + 1);

            // storeFileName : S3에 저장될 파일의 이름이다. 중복되지 않도록 UUID를 사용하여 저장한다.
            // (이름 중복이면 덮어씀.)
            String storeFileName = UUID.randomUUID().toString() + "." + ext;

            // key : S3에 파일이 저장될 위치이다.
            String key = BANNER_FILE + storeFileName;

            System.out.println(bucket);

            // 파일을 S3에 저장하는 작업을 수행한다.
            // multipartFile.getInputStream은 업로드한 파일의 입력 스트림을 받아온다.
            try (InputStream inputStream = multipartFile.getInputStream()) {
                // S3 클라우드 저장소에 파일을 업로드한다. 
                // bucket = S3 버킷의 이름
                amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                        // 업로드한 파일에 대한 공개접근 지정 : 파일에 대한 읽기 권한 공개
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {

                throw new RuntimeException(e);
            }
            //저장된 Url
            storeFileUrl = amazonS3Client.getUrl(bucket, key).toString();
        }

        return storeFileUrl;
    }

}

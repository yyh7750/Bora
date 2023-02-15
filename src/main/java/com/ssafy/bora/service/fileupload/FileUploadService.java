package com.ssafy.bora.service.fileupload;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.bora.entity.Station;
import com.ssafy.bora.entity.User;
import com.ssafy.bora.repository.station.IStationRepository;
import com.ssafy.bora.repository.user.IUserRepository;
import com.ssafy.bora.vo.FileVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.UUID;

/*
전달받은 파일을 S3에 저장하고 S3에 저장된 파일의 URL을 담은 FileVO 객체를 반환하는 기능이다.
 */
@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class FileUploadService {

    private final AmazonS3 amazonS3;
    private final IUserRepository userRepository;

    private final IStationRepository stationRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 파일을 업로드하는 메서드
    public FileVO fileUpload(MultipartFile file, String userId, String req){
        log.info("저장된 아이디:{} ", userId);


        // 파일 크기 보기
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Station djId = stationRepository.findStationByDjId(userId);


        log.info(String.valueOf(file.getSize()));

        // FileVO 객체를 생성하여 S3에 저장된 파일의 URL을 저장한다.
        FileVO fileVO = null;

        try{
            //업로드할 파일의 원래 이름과 확장자를 가져와서 저장될 파일 이름을 생성한다.
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf("."));
            // 저장될 파일 이름의 형식은 UUID + 원래 이름으로 들어간다.
            String savedName = UUID.randomUUID() + "-" + originalName;

            //파일 크기와 컨텐츠 타입을 저장할 ObjectMetadata 객체를 생성한다.
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(file.getSize()); //크기
            objMeta.setContentType(file.getContentType()); // 타입

            // 파일을 s3에 저장하고 s3 URL을 FileVO 객체에 저장한다.
            amazonS3.putObject(bucket, savedName, file.getInputStream(), objMeta);

            fileVO = FileVO.builder()
                    .imgOriginalName(originalName)
                    .imgNewName(savedName)
                    .imgPath(amazonS3.getUrl(bucket, savedName).toString())
                    .imgUploadTime(LocalDateTime.now()).build();

            if(req == "profile"){
                user.updateProfileImg(amazonS3.getUrl(bucket, savedName).toString());
                userRepository.save(user);
            }else if(req == "thumbnail"){
                djId.updateThumbNailImg(amazonS3.getUrl(bucket, savedName).toString());
                stationRepository.save(djId);
            }else{
                djId.updateBannerImg(amazonS3.getUrl(bucket, savedName).toString());
                stationRepository.save(djId);
            }


            log.info(fileVO.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
        return fileVO;
    }

}
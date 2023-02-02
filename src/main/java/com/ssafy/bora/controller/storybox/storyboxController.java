package com.ssafy.bora.controller.storybox;

import com.ssafy.bora.dto.stroybox.ReqStoryBoxDTO;
import com.ssafy.bora.dto.stroybox.ResStoryBoxDTO;
import com.ssafy.bora.service.storybox.IStoryBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/storybox")
public class storyboxController {

    private final IStoryBoxService storyBoxService;

    @PostMapping
    public ResponseEntity<?> createStoryBox(@RequestBody ReqStoryBoxDTO reqStoryBoxDTO) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.createStoryBox(reqStoryBoxDTO);
        if (resStoryBoxDTO != null) {
            return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("이미 사연을 신청하셨습니다", HttpStatus.OK);
    }

    @GetMapping("/list/{dj-id}")
    public ResponseEntity<?> findAllStoryBox(@PathVariable(name = "dj-id") String djId) {
        List<ResStoryBoxDTO> storyBoxDtoList = storyBoxService.findAllStoryBox(djId);

        if (storyBoxDtoList != null && !storyBoxDtoList.isEmpty()) {
            return new ResponseEntity<>(storyBoxDtoList, HttpStatus.OK);
        }
        return new ResponseEntity<>("등록된 사연이 없습니다.", HttpStatus.OK);
    }

    @GetMapping("/list/{dj-id}/{storybox-id}")
    public ResponseEntity<?> findByDjIdAndStoryBoxId(@PathVariable(name = "dj-id") String djId, @PathVariable(name = "storybox-id") int storyBoxId) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.findByDjIdAndStoryBoxId(djId, storyBoxId);
        if (resStoryBoxDTO != null) {
            return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>("잘못된 접근", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/list/{storybox-id}")
    public ResponseEntity<?> deleteStoryBox(@PathVariable(name = "storybox-id") int storyBoxId) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.deleteOneStoryBoxByDj(storyBoxId);
        if (resStoryBoxDTO != null) {
            return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>("잘못된 접근", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{dj-id}/{viewer-id}")
    public ResponseEntity<?> findMyStoryBoxOfDj(@PathVariable(name = "dj-id") String djId, @PathVariable(name = "viewer-id") String viewerId) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.findMyStoryBoxOfDj(djId, viewerId);
        if (resStoryBoxDTO != null) {
            return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>("신청한 사연이 없습니다.", HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<?> updateStoryBox(@RequestBody ReqStoryBoxDTO reqStoryBoxDTO){
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.updateStoryBox(reqStoryBoxDTO);
        if(resStoryBoxDTO != null){
            return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
        }
        // TODO: 에러 코드 뭐넣지
        return new ResponseEntity<>("업데이트 오류", HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
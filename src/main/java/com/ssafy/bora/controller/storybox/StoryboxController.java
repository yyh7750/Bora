package com.ssafy.bora.controller.storybox;

import com.ssafy.bora.dto.stroybox.ReqStoryBoxDTO;
import com.ssafy.bora.dto.stroybox.ResStoryBoxDTO;
import com.ssafy.bora.service.storybox.IStoryBoxService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/storybox")
@CrossOrigin(origins = "*")
public class StoryboxController {

    private final IStoryBoxService storyBoxService;

    @ApiOperation(value = "사연함 등록")
    @PostMapping
    public ResponseEntity<?> createStoryBox(@RequestBody ReqStoryBoxDTO reqStoryBoxDTO) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.createStoryBox(reqStoryBoxDTO);
        return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.CREATED);
    }

    @ApiOperation(value = "사연함 조회(dj)")
    @GetMapping("/list/{dj-id}")
    public ResponseEntity<Page<ResStoryBoxDTO>> findAllStoryBox(@PathVariable(name = "dj-id") String djId, Pageable pageable) {
        Page<ResStoryBoxDTO> storyBoxDtoList = storyBoxService.findAllStoryBox(djId, pageable);

        if (storyBoxDtoList != null && !storyBoxDtoList.isEmpty()) {
            return ResponseEntity.ok(storyBoxDtoList);
        }
        return ResponseEntity.noContent().build();
    }
    @ApiOperation(value = "사연함 상세조회(dj)")
    @GetMapping("/list/{dj-id}/{storybox-id}")
    public ResponseEntity<?> findByDjIdAndStoryBoxId(@PathVariable(name = "dj-id") String djId, @PathVariable(name = "storybox-id") int storyBoxId) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.findByDjIdAndStoryBoxId(djId, storyBoxId);
        return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
    }

    @ApiOperation(value = "사연함 삭제(공통)")
    @DeleteMapping("/list/{storybox-id}")
    public ResponseEntity<?> deleteStoryBox(@PathVariable(name = "storybox-id") int storyBoxId) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.deleteOneStoryBoxByDj(storyBoxId);
        return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
    }

    @ApiOperation(value = "사연함 여러개 삭제(dj)")
    @DeleteMapping("/list")
    public ResponseEntity<?> deleteStoryBoxList(@RequestBody List<Integer> storyBoxList) {
        storyBoxService.deleteStoryBoxListByDj(storyBoxList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "사연함 조회(시청자)")
    @GetMapping("/{dj-id}/{viewer-id}")
    public ResponseEntity<?> findMyStoryBoxOfDj(@PathVariable(name = "dj-id") String djId, @PathVariable(name = "viewer-id") String viewerId) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.findMyStoryBoxOfDj(djId, viewerId);
        return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
    }

    @ApiOperation(value = "사연함 수정(시청자)")
    @PatchMapping
    public ResponseEntity<?> updateStoryBox(@RequestBody ReqStoryBoxDTO reqStoryBoxDTO) {
        ResStoryBoxDTO resStoryBoxDTO = storyBoxService.updateStoryBox(reqStoryBoxDTO);
        return new ResponseEntity<>(resStoryBoxDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{dj-id}")
    public ResponseEntity<?> deleteAllAtEndBroadcast(@PathVariable(name = "dj-id") String djId) {
        storyBoxService.deleteAllAtEndBroadcast(djId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
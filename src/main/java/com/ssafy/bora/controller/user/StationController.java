package com.ssafy.bora.controller.user;

import com.ssafy.bora.dto.user.StationDTO;
import com.ssafy.bora.service.station.IStationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stations")
@CrossOrigin(origins = "*")
public class StationController {

    private final IStationService stationService;

    @ApiOperation(value = "방송 정보 생성")
    @PostMapping
    public ResponseEntity<?> createStation(@RequestBody StationDTO stationDTO) {
        return new ResponseEntity<>(stationService.createStation(stationDTO), HttpStatus.CREATED);
    }

    @ApiOperation(value = "방송 정보 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> findStationByDjId(@PathVariable String id) {
        return new ResponseEntity<>(stationService.findStationByDjId(id), HttpStatus.OK);
    }
    @ApiOperation(value = "방송 정보 수정")
    @PatchMapping
    public ResponseEntity<?> updateStationInfo(@RequestBody StationDTO stationDTO) {
        return new ResponseEntity<>(stationService.updateStationInfo(stationDTO), HttpStatus.OK);
    }
    @ApiOperation(value = "방송 정보 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStation(@PathVariable String id) {
        return new ResponseEntity<>(stationService.deleteStation(id), HttpStatus.OK);
    }
    @ApiOperation(value = "방송국 이름 중복 확인")
    @GetMapping("/check/{name}")
    public ResponseEntity<?> chechDuplicateStationName(@PathVariable String name) {
        return new ResponseEntity<>(stationService.checkDuplicateStationName(name), HttpStatus.OK);
    }
}
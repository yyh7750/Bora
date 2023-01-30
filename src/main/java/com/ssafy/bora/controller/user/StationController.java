package com.ssafy.bora.controller.user;

import com.ssafy.bora.dto.StationDTO;
import com.ssafy.bora.service.station.IStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/station")
public class StationController {

    private final IStationService stationService;

    @PostMapping
    public ResponseEntity<?> createStation(@RequestBody StationDTO stationDTO) {
        return new ResponseEntity<>(stationService.createStation(stationDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findStationByDjId(@PathVariable String id) {
        return new ResponseEntity<>(stationService.findStationByDjId(id), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<?> updateStationInfo(@RequestBody StationDTO stationDTO) {
        return new ResponseEntity<>(stationService.updateStationInfo(stationDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStation(@PathVariable String id) {
        return new ResponseEntity<>(stationService.deleteStation(id), HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> chechDuplicateStationName(@PathVariable String name) {
        return new ResponseEntity<>(stationService.checkDuplicateStationName(name), HttpStatus.OK);
    }
}
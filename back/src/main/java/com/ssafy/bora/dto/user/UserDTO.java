package com.ssafy.bora.dto.user;

import com.ssafy.bora.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Getter
@NoArgsConstructor
@Component
public class UserDTO {

    private String id;

    private String nickName;

    private boolean isDelete;

    private boolean status;

    private String desc;

    private StationDTO stationDTO;

    private String profileImg;

    public static UserDTO convertEntityToDTO(User findUser) {
        UserDTO userDTO = new UserDTO();
        userDTO.id = findUser.getId();
        userDTO.nickName = findUser.getNickName();
        userDTO.isDelete = findUser.isDelete();
        userDTO.status = findUser.isStatus();
        userDTO.desc = findUser.getDesc();
        userDTO.profileImg = findUser.getProfileImg();
        return userDTO;
    }

    @Builder
    public UserDTO(String id, String nickName, boolean isDelete, boolean status, String desc, StationDTO stationDTO, String profileImg) {
        this.id = id;
        this.nickName = nickName;
        this.isDelete = isDelete;
        this.status = status;
        this.desc = desc;
        this.stationDTO = stationDTO;
        this.profileImg = profileImg;
    }

    public void getStation(User findUser, int followCnt) {
        this.stationDTO = StationDTO.convertStationToDTO(findUser.getStation(), followCnt);
    }
}
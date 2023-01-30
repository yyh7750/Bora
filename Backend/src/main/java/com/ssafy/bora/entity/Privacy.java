package com.ssafy.bora.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Privacy {

    @Id
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 20)
    private String email;

    @Column(length = 16)
    private String pw;

    @Column(length = 8)
    private String birth;

    @Column(length = 32)
    private String authenticationKey;
}
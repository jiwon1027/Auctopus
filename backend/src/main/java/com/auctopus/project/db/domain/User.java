package com.auctopus.project.db.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String email;
    private String nickname;
    private String userName;
    private int social;
    private int bankCode;
    private String account;
    private String address;
    private String profileUrl;

    @Builder
    public User(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }

}
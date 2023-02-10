package com.auctopus.project.db.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert // JPA insert시 null인 필드 제외
@DynamicUpdate // 변경된 컬럼만 업데이트(Patch)
@Table(name = "user")
public class User {

    @Id
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
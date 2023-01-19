package com.acutopus.project.db.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="user")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "email")
    private String email;
    @Column(name = "nickname")
    private String nickname;

    @Builder
    public User(int id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }

}
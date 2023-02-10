package com.auctopus.project.db.domain;

import java.sql.Timestamp;
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
@DynamicInsert // JPA insert시 null인 필드 제외
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int historySeq;
    private String userEmail;
    private int auctionSeq;
    private int userInfo;
    private int finalPrice;
    private Timestamp createTime;
    private int state;

}
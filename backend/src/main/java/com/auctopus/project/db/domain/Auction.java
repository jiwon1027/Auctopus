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
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert // JPA insert시 null인 필드 제외
@DynamicUpdate // 변경된 컬럼만 업데이트(Patch)
@Table(name = "auction")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auctionSeq;
    private String userEmail;
    private int categorySeq;
    private String title;
    private String content;
    private Timestamp startTime;
    private int startPrice;
    private int bidUnit;
    private String link;
    private int likeCount;
    private int state;
}

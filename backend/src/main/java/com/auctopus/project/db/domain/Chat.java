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
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

//@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
//@DynamicInsert // JPA insert시 null인 필드 제외
//@Table(name = "chat")
public class Chat {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int chatSeq;
    private int liveSeq;
    private String userEmail;
    private String nickname;
    private String message;
    private Timestamp date;
    private int topPrice;
    private String topBidder;

}

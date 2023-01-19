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
@DynamicInsert
@Table(name = "live")
public class Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int liveSeq;
    private int userSeq;
    private int auctionSeq;
    private Timestamp startTime;
    private int onAir;

}

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
    private int liveSeq;
<<<<<<< HEAD
=======
    private int auctionSeq;
>>>>>>> 417637005a4125094c299e947be3194f384a6362
    private String userEmail;
    private Timestamp startTime;
    private Timestamp endTime;
    private int price;
    private int viewer;
<<<<<<< HEAD
    private int participant;
=======
>>>>>>> 417637005a4125094c299e947be3194f384a6362
    private int onAir;

}

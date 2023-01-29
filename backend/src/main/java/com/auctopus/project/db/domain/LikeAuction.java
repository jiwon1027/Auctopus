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
@Table(name = "like_auction")
public class LikeAuction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeAuctionSeq;
    private String email;
    private int auctionSeq;

}

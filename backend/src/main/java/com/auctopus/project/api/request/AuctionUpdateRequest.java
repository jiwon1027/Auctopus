package com.auctopus.project.api.request;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuctionUpdateRequest {

    int auctionSeq;
    int categorySeq;
    String title;
    String content;
    Timestamp startTime;
    int startPrice;
    int bidUnit;

}

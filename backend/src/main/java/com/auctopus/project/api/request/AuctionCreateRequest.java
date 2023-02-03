package com.auctopus.project.api.request;

import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuctionCreateRequest {
    int categorySeq;
    String title;
    String content;
    Timestamp startTime;
    int startPrice;
    int bidUnit;
}

package com.auctopus.project.api.request;

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
    String title;
    String content;
    String startTime;
    int startPrice;
    int categorySeq;
}

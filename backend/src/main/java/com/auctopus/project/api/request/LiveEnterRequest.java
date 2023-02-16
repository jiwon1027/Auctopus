package com.auctopus.project.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LiveEnterRequest {

    int liveSeq;
    int autoPrice;

}

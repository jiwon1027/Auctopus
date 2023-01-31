package com.auctopus.project.api.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LiveListResponse {
    Boolean hasMore;
    int categorySeq;
    List<LiveListOneResponse> resList;

    public static LiveListResponse of(Boolean hasMore, int categorySeq, List<LiveListOneResponse> resList) {
        LiveListResponse res = LiveListResponse.builder()
                .hasMore(hasMore)
                .categorySeq(categorySeq)
                .resList(resList)
                .build();
        return res;
    }
}

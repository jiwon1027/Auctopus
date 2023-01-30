package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Live;

public interface LiveService {

    void creataLive(int auctionSeq, String userEmail);

    Live getLive(int liveSeq);

    void increaseViewer(int liveSeq);

    void decreaseViewer(int liveSeq);

    void increaseParticipant(int liveSeq);

    void decreaseParticipant(int liveSeq);
}

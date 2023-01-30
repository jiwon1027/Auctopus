package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Live;

public interface LiveService {

    Live getLive(int liveSeq);

    void increaseViewer(int liveSeq);

    void decreaseViewer(int liveSeq);

//    void increaseParticipant(int liveSeq);
//
//    void increaseParticipant(int liveSeq);
}

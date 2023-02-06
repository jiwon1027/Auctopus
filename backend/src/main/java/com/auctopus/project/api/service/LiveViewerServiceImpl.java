package com.auctopus.project.api.service;

import com.auctopus.project.api.request.LiveEnterRequest;
import com.auctopus.project.db.domain.LiveViewer;
import com.auctopus.project.db.repository.LiveViewerRepository;
import com.auctopus.project.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiveViewerServiceImpl implements LiveViewerService {

    @Autowired
    LiveViewerRepository liveViewerRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public void createLiveViewer(LiveEnterRequest req) {
        LiveViewer liveViewer = LiveViewer.builder()
                .viewerEmail(req.getUserEmail())
                .liveSeq(req.getLiveSeq())
                .autoPrice(req.getAutoPrice())
                .state(req.getAutoPrice() == 0 ? 0 : 1)
                .build();
        liveViewerRepository.save(liveViewer);
    }

    @Override
    @Transactional
    public void updateViewerState(String userEmail) {
        LiveViewer liveViewer = liveViewerRepository.findByViewerEmail(userEmail).orElseThrow();
        liveViewer.setState(1);
    }

    @Override
    @Transactional
    public void deleteLiveViewer(String userEmail) {
        LiveViewer liveViewer = liveViewerRepository.findByViewerEmail(userEmail).orElseThrow();
        liveViewerRepository.delete(liveViewer);
    }

    @Override
    public LiveViewer getLiveViewer(String userEmail) {
        LiveViewer liveViewer = liveViewerRepository.findByViewerEmail(userEmail).orElseThrow();
        return liveViewer;
    }

}

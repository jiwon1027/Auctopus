package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.Live;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveRepository extends JpaRepository<Live, Integer> {

    Optional<Live> findByLiveSeq(int liveSeq);
}

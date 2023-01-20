package com.auctopus.project.db.repository;

import com.auctopus.project.db.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUserSeq(int userSeq);

    User findByNickName(String nickname);

    Optional<User> findByEmail(String email);

}

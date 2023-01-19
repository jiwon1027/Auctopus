package com.acutopus.project.db.repository;

import com.acutopus.project.db.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
     Optional<User> findById(Integer id);
}

package com.auctopus.project.api.service;

import java.util.List;
import org.springframework.stereotype.Service;

public interface LikeCategoryService {
    List<Long> getLikeCategoryByEmail(String email);
}

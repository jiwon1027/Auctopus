package com.auctopus.project.api.service;

import java.util.List;

public interface LikeCategoryService {

    List<Integer> getLikeCategoryByEmail(String email);
}

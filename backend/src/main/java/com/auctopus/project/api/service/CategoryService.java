package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Category;

public interface CategoryService {

    // 카테고리 이름 가져오기
    String getCategoryName(int categorySeq);

    int getCategorySeq(String categoryName);
}

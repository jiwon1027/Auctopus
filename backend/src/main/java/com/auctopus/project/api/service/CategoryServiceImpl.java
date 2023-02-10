package com.auctopus.project.api.service;

import com.auctopus.project.db.domain.Category;
import com.auctopus.project.db.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public String getCategoryName(int categorySeq) {
        return categoryRepository.findByCategorySeq(categorySeq).getCategoryName();
    }

    @Override
    public int getCategorySeq(String categoryName) {
        Category category = categoryRepository.findByCategoryName(categoryName);
        int categorySeq = category.getCategorySeq();
        return categorySeq;
    }

}

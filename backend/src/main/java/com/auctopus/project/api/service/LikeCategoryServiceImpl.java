package com.auctopus.project.api.service;


import com.auctopus.project.db.domain.LikeCategory;
import com.auctopus.project.db.repository.LikeCategoryRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeCategoryServiceImpl implements LikeCategoryService{

    @Autowired
    private LikeCategoryRepository likeCategoryRepository;

    @Override
    public List<Integer> getLikeCategoryByEmail(String email) {
        // User의 likeCategory 들을 email을 통해 가져옴
        List<Integer> UserCategoryList = new ArrayList<>();
        List<LikeCategory> likeCategoryList = likeCategoryRepository.findAllByUserEmail(email);
        for(LikeCategory likeCategory : likeCategoryList) {
            UserCategoryList.add(likeCategory.getCategorySeq());
        }
        return UserCategoryList;
    }
}

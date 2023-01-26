package com.auctopus.project.db.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@Table(name = "like_category")
public class LikeCategory {
    // 좋아하는 카테고리 순이면 카테고리에 담긴 순으로 진행....?????....????...?????....???
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeCategorySeq;
    private String email;
    private Long categorySeq;

}

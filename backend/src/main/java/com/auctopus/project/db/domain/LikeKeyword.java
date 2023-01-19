package com.aucopus.project.db.domain;

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
@Table(name = "like_keyword")
public class LikeKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeKeywordSeq;
    private int userSeq;
    private String keyword;

}

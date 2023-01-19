package com.acutopus.project.db.domain;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="auction")
public class Auction {
    @Id
    @Column(name = "id", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_seq", nullable = false)
//  @JoinColumn
//  @ManyToOne
    private Long user_seq;
    @Column(name = "category_seq", nullable = false)
    private int category_seq;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "content")
    private String content;
    @Column(name = "start_time")
    private String start_time;
    @Column(name = "price")
    private Long price;

    @Builder
    public Auction(Long id, Long user_seq, int category_seq, String title, String content,
            String start_time, Long price) {
        this.id = id;
        this.user_seq = user_seq;
        this.category_seq = category_seq;
        this.title = title;
        this.content = content;
        this.start_time = start_time;
        this.price = price;
    }
}

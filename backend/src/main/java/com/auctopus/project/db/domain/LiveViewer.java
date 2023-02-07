package com.auctopus.project.db.domain;

import javax.persistence.Entity;
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
@Table(name = "live_viewer")
public class LiveViewer {

    @Id
    private String viewerEmail;
    private int liveSeq;
    private int autoPrice;
    private int state;

}

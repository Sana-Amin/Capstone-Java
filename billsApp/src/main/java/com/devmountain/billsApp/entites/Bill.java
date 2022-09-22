package com.devmountain.billsApp.entites;

import com.devmountain.billsApp.dtos.BillDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "Bills")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(columnDefinition = "text")
    private String name;

    @Column
    private String dueDate;

    @Column
    private String paidDate;

    @Column
    private Double billAmount;

    @Column
    private Boolean paid;

    @Column(columnDefinition = "text")
    private String image;

    @Column
    private Boolean reoccurring;

    @ManyToOne
    @JsonBackReference
    private User user;

    public Bill(BillDto billDto){
        if(billDto.getName() != null){
            this.name = billDto.getName();
        }
        if (billDto.getDueDate() != null){
            this.dueDate = billDto.getDueDate();
        }
        if (billDto.getPaidDate() != null){
            this.paidDate = billDto.getPaidDate();
        }
        if (billDto.getBillAmount() != null){
            this.billAmount = billDto.getBillAmount();
        }
            this.paid= billDto.getPaid();

        if (billDto.getImage() != null){
            this.image = billDto.getImage();
        }

            this.reoccurring = billDto.getReoccurring();
    }
}

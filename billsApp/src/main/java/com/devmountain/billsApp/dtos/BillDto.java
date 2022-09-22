package com.devmountain.billsApp.dtos;


import com.devmountain.billsApp.entites.Bill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDto implements Serializable {
    private Long id;
    private String name;
    private String dueDate;
    private String paidDate;
    private Double billAmount;
    private Boolean paid;
    private String image;
    private Boolean reoccurring;

    private UserDto userDto;

    public BillDto(Bill bill){
        if(bill.getId() != null){
            this.id = bill.getId();
        }
        if (bill.getName() != null){
            this.name = bill.getName();
        }
        if (bill.getDueDate() != null){
            this.dueDate = bill.getDueDate();
        }
        if (bill.getPaidDate() != null){
            this.paidDate = bill.getPaidDate();
        }
        if (bill.getBillAmount() >= 0){
            this.billAmount = bill.getBillAmount();
        }
            this.paid = bill.getPaid();

        if (bill.getImage() != null){
            this.image = bill.getImage();
        }
            this.reoccurring = bill.getReoccurring();

    }
}

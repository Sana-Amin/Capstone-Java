package com.devmountain.billsApp.controllers;

import com.devmountain.billsApp.dtos.BillDto;
import com.devmountain.billsApp.services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/user/{userId}")
    public List<BillDto> getBillsByUser(@PathVariable Long userId){
        return billService.getAllBillsByUserId(userId);
    }

    @GetMapping("/{billId}")
    public Optional<BillDto> getAllBillById(@PathVariable Long billId){
        return billService.getBillById(billId);
    }

    @PostMapping("/user/{userId}")
    public void addBill(@RequestBody BillDto billDto,@PathVariable Long userId){
        billService.addBill(billDto, userId);
    }

    @DeleteMapping("/{billId}")
    public void deleteBillById(@PathVariable Long billId){
        billService.deleteBillById(billId);
    }

    @PutMapping
    public void updateBill(@RequestBody BillDto billDto){
        billService.updateBillById(billDto);
    }

    @GetMapping("/user/{userId}/total")
    public double getBillTotal(@PathVariable Long userId){ return billService.getBillTotal(userId);}
}

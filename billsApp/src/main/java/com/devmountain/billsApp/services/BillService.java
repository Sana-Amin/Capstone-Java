package com.devmountain.billsApp.services;

import com.devmountain.billsApp.dtos.BillDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface BillService {
    @Transactional
    void addBill(BillDto billDto, Long userId);

    @Transactional
    void deleteBillById(Long billId);

    @Transactional
    void updateBillById(BillDto billDto);

    List<BillDto> getAllBillsByUserId(Long userId);

    Optional<BillDto> getBillById(Long billId);

    double getBillTotal(Long userID);
}

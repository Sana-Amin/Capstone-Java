package com.devmountain.billsApp.services;

import com.devmountain.billsApp.dtos.BillDto;
import com.devmountain.billsApp.entites.Bill;
import com.devmountain.billsApp.entites.User;
import com.devmountain.billsApp.repositories.BillRepository;
import com.devmountain.billsApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements BillService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BillRepository billRepository;

    @Override
    @Transactional
    public void addBill(BillDto billDto, Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        Bill bill = new Bill(billDto);
        userOptional.ifPresent(bill::setUser);
        billRepository.saveAndFlush(bill);
    }
    @Override
    @Transactional
    public void deleteBillById(Long billId) {
        Optional<Bill> billOptional = billRepository.findById(billId);
        billOptional.ifPresent(bill -> billRepository.delete(bill));
    }
    @Override
    @Transactional
    public void updateBillById(BillDto billDto){
        Optional<Bill> billOptional = billRepository.findById(billDto.getId());
        billOptional.ifPresent(bill -> {
            bill.setName(billDto.getName());
            bill.setDueDate(billDto.getDueDate());
            bill.setPaidDate(billDto.getPaidDate());
            bill.setBillAmount(billDto.getBillAmount());
            bill.setPaid(billDto.getPaid());
           bill.setImage(billDto.getImage());
            bill.setReoccurring(billDto.getReoccurring());
            billRepository.saveAndFlush(bill);
        });
    }

    @Override
    public List<BillDto> getAllBillsByUserId(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()){
            List<Bill> billList = billRepository.findAllByUserEquals(userOptional.get());
            return billList.stream().map(bill -> new BillDto(bill)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public double getBillTotal(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()){
            List<Bill> billList = billRepository.findAllByUserEquals(userOptional.get());
            double totalBillAmount = 0.0;
            for(Bill bill : billList){
                if(! bill.getPaid()){
                    totalBillAmount += bill.getBillAmount();
                }
            }
            return totalBillAmount;
        }
        return 0.0;
    }

    @Override
    public Optional<BillDto> getBillById(Long billId){
        Optional<Bill> billOptional = billRepository.findById(billId);
        if (billOptional.isPresent()){
            return Optional.of(new BillDto(billOptional.get()));
        }
        return Optional.empty();
    }

}

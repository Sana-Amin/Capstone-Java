package com.devmountain.billsApp.repositories;

import com.devmountain.billsApp.entites.Bill;
import com.devmountain.billsApp.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findAllByUserEquals(User user);
}

package com.nro.footballnro.service;

import com.nro.footballnro.entity.Stadium;
import com.nro.footballnro.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StadiumService {
    @Autowired
    private StadiumRepository stadiumRepository;

    public List<Stadium> getAllTheStadiums(){
        List<Stadium> stadiumList = new ArrayList<>();
        stadiumRepository.findAll().forEach(stadiumList::add);
        return stadiumList;
    }

    public void saveStadium(Stadium stadium){
        stadiumRepository.save(stadium);
    }

    public void updateStadium(Stadium stadium){
        stadiumRepository.save(stadium);
    }

    public void deleteStadium(Long id){
        stadiumRepository.deleteById(id);
    }
}

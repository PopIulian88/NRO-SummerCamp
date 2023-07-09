package com.nro.footballnro.repository;

import com.nro.footballnro.entity.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {

}

package com.nro.footballnro.repository;

import com.nro.footballnro.entity.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {

}

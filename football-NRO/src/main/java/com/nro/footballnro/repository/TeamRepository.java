package com.nro.footballnro.repository;

import com.nro.footballnro.entity.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {
}

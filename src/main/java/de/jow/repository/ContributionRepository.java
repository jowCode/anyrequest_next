package de.jow.repository;

import de.jow.domain.Contribution;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Contribution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {

}

package de.jow.service;

import de.jow.domain.Contribution;
import de.jow.repository.ContributionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Contribution}.
 */
@Service
@Transactional
public class ContributionService {

    private final Logger log = LoggerFactory.getLogger(ContributionService.class);

    private final ContributionRepository contributionRepository;

    public ContributionService(ContributionRepository contributionRepository) {
        this.contributionRepository = contributionRepository;
    }

    /**
     * Save a contribution.
     *
     * @param contribution the entity to save.
     * @return the persisted entity.
     */
    public Contribution save(Contribution contribution) {
        log.debug("Request to save Contribution : {}", contribution);
        return contributionRepository.save(contribution);
    }

    /**
     * Get all the contributions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Contribution> findAll(Pageable pageable) {
        log.debug("Request to get all Contributions");
        return contributionRepository.findAll(pageable);
    }

    /**
     * Get one contribution by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Contribution> findOne(Long id) {
        log.debug("Request to get Contribution : {}", id);
        return contributionRepository.findById(id);
    }

    /**
     * Delete the contribution by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Contribution : {}", id);
        contributionRepository.deleteById(id);
    }
}

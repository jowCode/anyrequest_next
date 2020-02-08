package de.jow.web.rest;

import de.jow.domain.Contribution;
import de.jow.service.ContributionService;
import de.jow.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.jow.domain.Contribution}.
 */
@RestController
@RequestMapping("/api")
public class ContributionResource {

    private final Logger log = LoggerFactory.getLogger(ContributionResource.class);

    private static final String ENTITY_NAME = "contribution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContributionService contributionService;

    public ContributionResource(ContributionService contributionService) {
        this.contributionService = contributionService;
    }

    /**
     * {@code POST  /contributions} : Create a new contribution.
     *
     * @param contribution the contribution to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contribution, or with status {@code 400 (Bad Request)} if the contribution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contributions")
    public ResponseEntity<Contribution> createContribution(@Valid @RequestBody Contribution contribution) throws URISyntaxException {
        log.debug("REST request to save Contribution : {}", contribution);
        if (contribution.getId() != null) {
            throw new BadRequestAlertException("A new contribution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contribution result = contributionService.save(contribution);
        return ResponseEntity.created(new URI("/api/contributions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contributions} : Updates an existing contribution.
     *
     * @param contribution the contribution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contribution,
     * or with status {@code 400 (Bad Request)} if the contribution is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contribution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contributions")
    public ResponseEntity<Contribution> updateContribution(@Valid @RequestBody Contribution contribution) throws URISyntaxException {
        log.debug("REST request to update Contribution : {}", contribution);
        if (contribution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contribution result = contributionService.save(contribution);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contribution.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contributions} : get all the contributions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contributions in body.
     */
    @GetMapping("/contributions")
    public ResponseEntity<List<Contribution>> getAllContributions(Pageable pageable) {
        log.debug("REST request to get a page of Contributions");
        Page<Contribution> page = contributionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contributions/:id} : get the "id" contribution.
     *
     * @param id the id of the contribution to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contribution, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contributions/{id}")
    public ResponseEntity<Contribution> getContribution(@PathVariable Long id) {
        log.debug("REST request to get Contribution : {}", id);
        Optional<Contribution> contribution = contributionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contribution);
    }

    /**
     * {@code DELETE  /contributions/:id} : delete the "id" contribution.
     *
     * @param id the id of the contribution to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contributions/{id}")
    public ResponseEntity<Void> deleteContribution(@PathVariable Long id) {
        log.debug("REST request to delete Contribution : {}", id);
        contributionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

}

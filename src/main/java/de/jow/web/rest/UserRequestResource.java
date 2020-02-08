package de.jow.web.rest;

import de.jow.domain.UserRequest;
import de.jow.service.UserRequestService;
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
 * REST controller for managing {@link de.jow.domain.UserRequest}.
 */
@RestController
@RequestMapping("/api")
public class UserRequestResource {

    private final Logger log = LoggerFactory.getLogger(UserRequestResource.class);

    private static final String ENTITY_NAME = "userRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRequestService userRequestService;

    public UserRequestResource(UserRequestService userRequestService) {
        this.userRequestService = userRequestService;
    }

    /**
     * {@code POST  /user-requests} : Create a new userRequest.
     *
     * @param userRequest the userRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userRequest, or with status {@code 400 (Bad Request)} if the userRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-requests")
    public ResponseEntity<UserRequest> createUserRequest(@Valid @RequestBody UserRequest userRequest) throws URISyntaxException {
        log.debug("REST request to save UserRequest : {}", userRequest);
        if (userRequest.getId() != null) {
            throw new BadRequestAlertException("A new userRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRequest result = userRequestService.save(userRequest);
        return ResponseEntity.created(new URI("/api/user-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-requests} : Updates an existing userRequest.
     *
     * @param userRequest the userRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userRequest,
     * or with status {@code 400 (Bad Request)} if the userRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-requests")
    public ResponseEntity<UserRequest> updateUserRequest(@Valid @RequestBody UserRequest userRequest) throws URISyntaxException {
        log.debug("REST request to update UserRequest : {}", userRequest);
        if (userRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserRequest result = userRequestService.save(userRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-requests} : get all the userRequests.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userRequests in body.
     */
    @GetMapping("/user-requests")
    public ResponseEntity<List<UserRequest>> getAllUserRequests(Pageable pageable) {
        log.debug("REST request to get a page of UserRequests");
        Page<UserRequest> page = userRequestService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-requests/:id} : get the "id" userRequest.
     *
     * @param id the id of the userRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-requests/{id}")
    public ResponseEntity<UserRequest> getUserRequest(@PathVariable Long id) {
        log.debug("REST request to get UserRequest : {}", id);
        Optional<UserRequest> userRequest = userRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userRequest);
    }

    /**
     * {@code DELETE  /user-requests/:id} : delete the "id" userRequest.
     *
     * @param id the id of the userRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-requests/{id}")
    public ResponseEntity<Void> deleteUserRequest(@PathVariable Long id) {
        log.debug("REST request to delete UserRequest : {}", id);
        userRequestService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

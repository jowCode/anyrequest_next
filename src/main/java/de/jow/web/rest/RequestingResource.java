package de.jow.web.rest;

import de.jow.domain.User;
import de.jow.domain.UserRequest;
import de.jow.security.AuthoritiesConstants;
import de.jow.service.UserRequestService;
import de.jow.service.UserService;
import de.jow.service.dto.NewRequestDTO;
import de.jow.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing user requests.
 */
@RestController
@RequestMapping("/api")
public class RequestingResource {

    private final Logger log = LoggerFactory.getLogger(RequestingResource.class);

    private static final String ENTITY_NAME = "userRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRequestService userRequestService;

    private final UserService userService;

    public RequestingResource(
        final UserRequestService userRequestService,
        final UserService userService) {
        this.userRequestService = userRequestService;
        this.userService = userService;
    }

    /**
     * {@code GET  /my-requests} : get all my userRequests.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userRequests in body.
     */
    @GetMapping("/my-requests")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<List<UserRequest>> getAllMyRequests(final Pageable pageable) {
        log.debug("REST request to get a page of my UserRequests");

        Optional<User> currentUser = userService.getUserWithAuthorities();
        if(currentUser.isPresent()) {

            Page<UserRequest> page = userRequestService.findByUser(pageable, currentUser.get().getLogin());
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(
                ServletUriComponentsBuilder.fromCurrentRequest(), page);

            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }

        throw new BadRequestAlertException("Could not determine user", ENTITY_NAME, "invaliduser");

    }


    /**
     * {@code POST  /new-request} : Create a new userRequest.
     *
     * @param newRequestDTO the userRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userRequest, or with status {@code 400 (Bad Request)} if the userRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/new-request")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<UserRequest> newUserRequest(
        @RequestBody NewRequestDTO newRequestDTO) throws URISyntaxException {

        log.debug("REST request to publish a new UserRequest : {}", newRequestDTO);

        Optional<User> currentUser = userService.getUserWithAuthorities();
        if(currentUser.isPresent()) {

            UserRequest result = userRequestService.createNew(newRequestDTO, currentUser.get());

            return ResponseEntity.created(new URI("/api/new-request/" + result.getId()))
                .headers(
                    HeaderUtil.createEntityCreationAlert(
                        applicationName, true, ENTITY_NAME, result.getId()
                            .toString()))
                .body(result);
        }

        throw new BadRequestAlertException("Could not determine requesting user needed for creating ", ENTITY_NAME, "invaliduser");

    }
}

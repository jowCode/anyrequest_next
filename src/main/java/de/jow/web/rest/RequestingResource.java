package de.jow.web.rest;

import de.jow.domain.User;
import de.jow.domain.UserRequest;
import de.jow.security.AuthoritiesConstants;
import de.jow.service.UserRequestService;
import de.jow.service.UserService;
import de.jow.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
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
     * {@code POST  /new-request} : Create a new userRequest.
     *
     * @param userRequest the userRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userRequest, or with status {@code 400 (Bad Request)} if the userRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/new-request")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<UserRequest> newUserRequest(
        @Valid @RequestBody UserRequest userRequest) throws URISyntaxException {

        log.debug("REST request to publish a new UserRequest : {}", userRequest);

        // Get the current logged in user
        Optional<User> currentUser = userService.getUserWithAuthorities();

        if(currentUser.isPresent()) {

            if (userRequest.getId() != null) {
                throw new BadRequestAlertException("A new userRequest cannot already have an ID", ENTITY_NAME, "idexists");
            }

            UserRequest result = userRequestService.createNew(userRequest, currentUser.get());

            return ResponseEntity.created(new URI("/api/new-request/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
        }

        throw new BadRequestAlertException("Could not determine requesting user needed for creating ", ENTITY_NAME, "invaliduser");

    }
}

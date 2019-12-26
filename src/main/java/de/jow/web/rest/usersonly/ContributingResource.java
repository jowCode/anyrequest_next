package de.jow.web.rest.usersonly;

import de.jow.domain.UserRequest;
import de.jow.security.AuthoritiesConstants;
import de.jow.service.UserRequestService;
import de.jow.service.UserService;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ContributingResource {

    private final Logger log = LoggerFactory.getLogger(ContributingResource.class);

    private static final String ENTITY_NAME = "contribution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRequestService userRequestService;

    private final UserService userService;

    public ContributingResource(
        final UserRequestService userRequestService,
        final UserService userService) {
        this.userRequestService = userRequestService;
        this.userService = userService;
    }

    /**
     * {@code GET  /global-requests} : get all the userRequests.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userRequests in body.
     */
    @GetMapping("/user/global-requests")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<List<UserRequest>> getAllUserRequests(Pageable pageable) {

        log.debug("REST request to get a page of all UserRequests");

        Page<UserRequest> page = userRequestService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);

        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * TODO check if the contributing user is not blocked by the requesting user to see the details
     * {@code GET  /user-requests/:id} : get the "id" userRequest.
     *
     * @param id the id of the userRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user/global-requests/{id}")
    public ResponseEntity<UserRequest> getUserRequest(@PathVariable Long id) {
        log.debug("REST request to get UserRequest : {}", id);
        Optional<UserRequest> userRequest = userRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userRequest);
    }
}

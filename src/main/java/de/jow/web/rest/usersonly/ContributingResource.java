package de.jow.web.rest.usersonly;

import de.jow.domain.Contribution;
import de.jow.domain.Conversation;
import de.jow.domain.User;
import de.jow.domain.UserRequest;
import de.jow.domain.enumeration.ContributionStatus;
import de.jow.security.AuthoritiesConstants;
import de.jow.service.ContributionService;
import de.jow.service.UserRequestService;
import de.jow.service.UserService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import static de.jow.domain.Contribution_.contributionMessage;

@RestController
@RequestMapping("/api")
public class ContributingResource {

    private final Logger log = LoggerFactory.getLogger(ContributingResource.class);

    private static final String ENTITY_NAME = "contribution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final UserRequestService userRequestService;
    private final UserService userService;
    private final ContributionService contributionService;

    public ContributingResource(
        final UserRequestService userRequestService,
        final UserService userService,
        final ContributionService contributionService) {
        this.userRequestService = userRequestService;
        this.userService = userService;
        this.contributionService = contributionService;
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
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<UserRequest> getUserRequest(@PathVariable Long id) {
        log.debug("REST request to get UserRequest : {}", id);
        Optional<UserRequest> userRequest = userRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userRequest);
    }

    /**
     * {@code POST  /user/global-requests/contribute/:requestId} : Contribute to a userRequest.
     *
     * @param requestId id of the userRequest to contribute to.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contribution, or with status {@code 400 (Bad Request)} if the contribution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user/contribute/{requestId}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Contribution> createContribution(
        final @PathVariable Long requestId,
        final @RequestParam String contributionMessage) throws URISyntaxException {

        log.debug("REST request to contribute to a UserRequest with ID: {}", requestId);

        // Current logged in user
        User currentUser =
            userService.getUserWithAuthorities().orElseThrow(() ->
                new BadRequestAlertException("ERROR", ENTITY_NAME, "noUser"));

        // The userRequest the currentUser wants to contribute to
        UserRequest userRequest =
            userRequestService.findOne(requestId).orElseThrow(() ->
                new BadRequestAlertException("ERROR", ENTITY_NAME, "noUserRequest"));

        // User cannot contribute to its own request
        if (userRequest.getRequestingUser().equals(currentUser.getLogin())) {
            throw new BadRequestAlertException("ERROR", ENTITY_NAME, "sameUser");
        }

        Contribution contribution = new Contribution();
        contribution.setContributingUser(currentUser.getLogin());
        contribution.setUserRequest(userRequest);
        contribution.setContributionStatus(ContributionStatus.PENDING);
        contribution.setContributionMessage(contributionMessage);
        contribution.setConversation(null);

        Contribution result = contributionService.save(contribution);
        return ResponseEntity.created(new URI("/api/contributions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}

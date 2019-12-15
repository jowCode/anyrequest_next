package de.jow.web.rest;

import de.jow.domain.UserCreditAccount;
import de.jow.service.UserCreditAccountService;
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
 * REST controller for managing {@link de.jow.domain.UserCreditAccount}.
 */
@RestController
@RequestMapping("/api")
public class UserCreditAccountResource {

    private final Logger log = LoggerFactory.getLogger(UserCreditAccountResource.class);

    private static final String ENTITY_NAME = "userCreditAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserCreditAccountService userCreditAccountService;

    public UserCreditAccountResource(UserCreditAccountService userCreditAccountService) {
        this.userCreditAccountService = userCreditAccountService;
    }

    /**
     * {@code POST  /user-credit-accounts} : Create a new userCreditAccount.
     *
     * @param userCreditAccount the userCreditAccount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userCreditAccount, or with status {@code 400 (Bad Request)} if the userCreditAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-credit-accounts")
    public ResponseEntity<UserCreditAccount> createUserCreditAccount(@Valid @RequestBody UserCreditAccount userCreditAccount) throws URISyntaxException {
        log.debug("REST request to save UserCreditAccount : {}", userCreditAccount);
        if (userCreditAccount.getId() != null) {
            throw new BadRequestAlertException("A new userCreditAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserCreditAccount result = userCreditAccountService.save(userCreditAccount);
        return ResponseEntity.created(new URI("/api/user-credit-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-credit-accounts} : Updates an existing userCreditAccount.
     *
     * @param userCreditAccount the userCreditAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userCreditAccount,
     * or with status {@code 400 (Bad Request)} if the userCreditAccount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userCreditAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-credit-accounts")
    public ResponseEntity<UserCreditAccount> updateUserCreditAccount(@Valid @RequestBody UserCreditAccount userCreditAccount) throws URISyntaxException {
        log.debug("REST request to update UserCreditAccount : {}", userCreditAccount);
        if (userCreditAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserCreditAccount result = userCreditAccountService.save(userCreditAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userCreditAccount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-credit-accounts} : get all the userCreditAccounts.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userCreditAccounts in body.
     */
    @GetMapping("/user-credit-accounts")
    public ResponseEntity<List<UserCreditAccount>> getAllUserCreditAccounts(Pageable pageable) {
        log.debug("REST request to get a page of UserCreditAccounts");
        Page<UserCreditAccount> page = userCreditAccountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-credit-accounts/:id} : get the "id" userCreditAccount.
     *
     * @param id the id of the userCreditAccount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userCreditAccount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-credit-accounts/{id}")
    public ResponseEntity<UserCreditAccount> getUserCreditAccount(@PathVariable Long id) {
        log.debug("REST request to get UserCreditAccount : {}", id);
        Optional<UserCreditAccount> userCreditAccount = userCreditAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userCreditAccount);
    }

    /**
     * {@code DELETE  /user-credit-accounts/:id} : delete the "id" userCreditAccount.
     *
     * @param id the id of the userCreditAccount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-credit-accounts/{id}")
    public ResponseEntity<Void> deleteUserCreditAccount(@PathVariable Long id) {
        log.debug("REST request to delete UserCreditAccount : {}", id);
        userCreditAccountService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

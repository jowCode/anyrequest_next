package de.jow.service;

import de.jow.domain.User;
import de.jow.domain.UserCreditAccount;
import de.jow.repository.UserCreditAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link UserCreditAccount}.
 */
@Service
@Transactional
public class UserCreditAccountService {

    private final Logger log = LoggerFactory.getLogger(UserCreditAccountService.class);

    private final UserCreditAccountRepository userCreditAccountRepository;

    public UserCreditAccountService(UserCreditAccountRepository userCreditAccountRepository) {
        this.userCreditAccountRepository = userCreditAccountRepository;
    }

    /**
     * Creates a new UserCreditAccount for a specific user.
     * @param user User
     * @return UserCreditAccount
     */
    public UserCreditAccount createUserCreditAccount(final User user) {

        UserCreditAccount userCreditAccount = new UserCreditAccount();
        userCreditAccount.setUsedCredits(0);
        userCreditAccount.setReceivedCredits(0);
        userCreditAccount.setTotalCredits(0);
        userCreditAccount.setUser(user);

        return this.userCreditAccountRepository.save(userCreditAccount);
    }

    /**
     * Save a userCreditAccount.
     *
     * @param userCreditAccount the entity to save.
     * @return the persisted entity.
     */
    public UserCreditAccount save(UserCreditAccount userCreditAccount) {
        log.debug("Request to save UserCreditAccount : {}", userCreditAccount);
        return userCreditAccountRepository.save(userCreditAccount);
    }

    /**
     * Get all the userCreditAccounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<UserCreditAccount> findAll(Pageable pageable) {
        log.debug("Request to get all UserCreditAccounts");
        return userCreditAccountRepository.findAll(pageable);
    }


    /**
     * Get one userCreditAccount by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserCreditAccount> findOne(Long id) {
        log.debug("Request to get UserCreditAccount : {}", id);
        return userCreditAccountRepository.findById(id);
    }

    /**
     * Delete the userCreditAccount by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UserCreditAccount : {}", id);
        userCreditAccountRepository.deleteById(id);
    }
}

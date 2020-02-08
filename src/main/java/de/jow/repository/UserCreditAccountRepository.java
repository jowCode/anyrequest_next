package de.jow.repository;

import de.jow.domain.UserCreditAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserCreditAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserCreditAccountRepository extends JpaRepository<UserCreditAccount, Long> {

}

package de.jow.repository;

import de.jow.domain.User;
import de.jow.domain.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRequestRepository extends JpaRepository<UserRequest, Long> {

    Page<UserRequest> findByRequestingUser(Pageable pageable, String requestingUser);
}

package de.jow.service;

import de.jow.domain.User;
import de.jow.domain.UserRequest;
import de.jow.domain.enumeration.Urgency;
import de.jow.repository.UserRequestRepository;
import de.jow.service.dto.NewRequestDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserRequest}.
 */
@Service
@Transactional
public class UserRequestService {

    private final Logger log = LoggerFactory.getLogger(UserRequestService.class);

    private final UserRequestRepository userRequestRepository;

    public UserRequestService(UserRequestRepository userRequestRepository) {
        this.userRequestRepository = userRequestRepository;
    }

    /**
     * Creates a new userRequest.
     *
     * @param newRequestDTO the entity to save.
     * @return the persisted entity.
     */
    public UserRequest createNew(
        final NewRequestDTO newRequestDTO,
        final User currentUser) {

        log.debug("Request to create a new UserRequest : {}", newRequestDTO);

        UserRequest newUserRequest = new UserRequest();

        newUserRequest.setRequestingUser(currentUser.getLogin());
        newUserRequest.setTitle(newRequestDTO.getTitle());
        newUserRequest.setDescription(newRequestDTO.getDescription());
        newUserRequest.setUrgency(newRequestDTO.getUrgency());
        newUserRequest.setContributorCount(0);

        ZonedDateTime validTo = ZonedDateTime.now();

        switch (newUserRequest.getUrgency()) {
            case HIGH:
                newUserRequest.setValidTo(validTo.plusHours(6));
                break;
            case MEDIUM:
                newUserRequest.setValidTo(validTo.plusDays(3));
                break;
            case LOW:
                newUserRequest.setValidTo(validTo.plusDays(14));
                break;
        }

        newUserRequest.setContributorCount(0);

        return userRequestRepository.save(newUserRequest);
    }


    /**
     * Save a userRequest.
     *
     * @param userRequest the entity to save.
     * @return the persisted entity.
     */
    public UserRequest save(UserRequest userRequest) {
        log.debug("Request to save UserRequest : {}", userRequest);
        return userRequestRepository.save(userRequest);
    }

    /**
     * Get all the userRequests.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<UserRequest> findAll(Pageable pageable) {
        log.debug("Request to get all UserRequests");
        return userRequestRepository.findAll(pageable);
    }


    /**
     * Get one userRequest by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserRequest> findOne(Long id) {
        log.debug("Request to get UserRequest : {}", id);
        return userRequestRepository.findById(id);
    }

    /**
     * Delete the userRequest by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UserRequest : {}", id);
        userRequestRepository.deleteById(id);
    }
}

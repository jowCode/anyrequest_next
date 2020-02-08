package de.jow.service;

import de.jow.domain.Conversation;
import de.jow.repository.ConversationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Conversation}.
 */
@Service
@Transactional
public class ConversationService {

    private final Logger log = LoggerFactory.getLogger(ConversationService.class);

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    /**
     * Save a conversation.
     *
     * @param conversation the entity to save.
     * @return the persisted entity.
     */
    public Conversation save(Conversation conversation) {
        log.debug("Request to save Conversation : {}", conversation);
        return conversationRepository.save(conversation);
    }

    /**
     * Get all the conversations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Conversation> findAll(Pageable pageable) {
        log.debug("Request to get all Conversations");
        return conversationRepository.findAll(pageable);
    }



    /**
    *  Get all the conversations where Contribution is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Conversation> findAllWhereContributionIsNull() {
        log.debug("Request to get all conversations where Contribution is null");
        return StreamSupport
            .stream(conversationRepository.findAll().spliterator(), false)
            .filter(conversation -> conversation.getContribution() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one conversation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Conversation> findOne(Long id) {
        log.debug("Request to get Conversation : {}", id);
        return conversationRepository.findById(id);
    }

    /**
     * Delete the conversation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Conversation : {}", id);
        conversationRepository.deleteById(id);
    }
}

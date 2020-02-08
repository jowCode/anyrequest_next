package de.jow.service;

import de.jow.domain.ChatMessage;
import de.jow.repository.ChatMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ChatMessage}.
 */
@Service
@Transactional
public class ChatMessageService {

    private final Logger log = LoggerFactory.getLogger(ChatMessageService.class);

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    /**
     * Save a chatMessage.
     *
     * @param chatMessage the entity to save.
     * @return the persisted entity.
     */
    public ChatMessage save(ChatMessage chatMessage) {
        log.debug("Request to save ChatMessage : {}", chatMessage);
        return chatMessageRepository.save(chatMessage);
    }

    /**
     * Get all the chatMessages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ChatMessage> findAll(Pageable pageable) {
        log.debug("Request to get all ChatMessages");
        return chatMessageRepository.findAll(pageable);
    }

    /**
     * Get one chatMessage by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ChatMessage> findOne(Long id) {
        log.debug("Request to get ChatMessage : {}", id);
        return chatMessageRepository.findById(id);
    }

    /**
     * Delete the chatMessage by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ChatMessage : {}", id);
        chatMessageRepository.deleteById(id);
    }
}

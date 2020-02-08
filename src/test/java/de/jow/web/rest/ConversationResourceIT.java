package de.jow.web.rest;

import de.jow.AnyrequestNextApp;
import de.jow.domain.Conversation;
import de.jow.repository.ConversationRepository;
import de.jow.service.ConversationService;
import de.jow.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static de.jow.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.jow.domain.enumeration.ConversationStatus;
/**
 * Integration tests for the {@link ConversationResource} REST controller.
 */
@SpringBootTest(classes = AnyrequestNextApp.class)
public class ConversationResourceIT {

    private static final ConversationStatus DEFAULT_CONVERSATION_STATUS = ConversationStatus.OPEN;
    private static final ConversationStatus UPDATED_CONVERSATION_STATUS = ConversationStatus.CLOSED;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restConversationMockMvc;

    private Conversation conversation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConversationResource conversationResource = new ConversationResource(conversationService);
        this.restConversationMockMvc = MockMvcBuilders.standaloneSetup(conversationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conversation createEntity(EntityManager em) {
        Conversation conversation = new Conversation()
            .conversationStatus(DEFAULT_CONVERSATION_STATUS);
        return conversation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conversation createUpdatedEntity(EntityManager em) {
        Conversation conversation = new Conversation()
            .conversationStatus(UPDATED_CONVERSATION_STATUS);
        return conversation;
    }

    @BeforeEach
    public void initTest() {
        conversation = createEntity(em);
    }

    @Test
    @Transactional
    public void createConversation() throws Exception {
        int databaseSizeBeforeCreate = conversationRepository.findAll().size();

        // Create the Conversation
        restConversationMockMvc.perform(post("/api/conversations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conversation)))
            .andExpect(status().isCreated());

        // Validate the Conversation in the database
        List<Conversation> conversationList = conversationRepository.findAll();
        assertThat(conversationList).hasSize(databaseSizeBeforeCreate + 1);
        Conversation testConversation = conversationList.get(conversationList.size() - 1);
        assertThat(testConversation.getConversationStatus()).isEqualTo(DEFAULT_CONVERSATION_STATUS);
    }

    @Test
    @Transactional
    public void createConversationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conversationRepository.findAll().size();

        // Create the Conversation with an existing ID
        conversation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConversationMockMvc.perform(post("/api/conversations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conversation)))
            .andExpect(status().isBadRequest());

        // Validate the Conversation in the database
        List<Conversation> conversationList = conversationRepository.findAll();
        assertThat(conversationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConversations() throws Exception {
        // Initialize the database
        conversationRepository.saveAndFlush(conversation);

        // Get all the conversationList
        restConversationMockMvc.perform(get("/api/conversations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conversation.getId().intValue())))
            .andExpect(jsonPath("$.[*].conversationStatus").value(hasItem(DEFAULT_CONVERSATION_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getConversation() throws Exception {
        // Initialize the database
        conversationRepository.saveAndFlush(conversation);

        // Get the conversation
        restConversationMockMvc.perform(get("/api/conversations/{id}", conversation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(conversation.getId().intValue()))
            .andExpect(jsonPath("$.conversationStatus").value(DEFAULT_CONVERSATION_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConversation() throws Exception {
        // Get the conversation
        restConversationMockMvc.perform(get("/api/conversations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConversation() throws Exception {
        // Initialize the database
        conversationService.save(conversation);

        int databaseSizeBeforeUpdate = conversationRepository.findAll().size();

        // Update the conversation
        Conversation updatedConversation = conversationRepository.findById(conversation.getId()).get();
        // Disconnect from session so that the updates on updatedConversation are not directly saved in db
        em.detach(updatedConversation);
        updatedConversation
            .conversationStatus(UPDATED_CONVERSATION_STATUS);

        restConversationMockMvc.perform(put("/api/conversations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConversation)))
            .andExpect(status().isOk());

        // Validate the Conversation in the database
        List<Conversation> conversationList = conversationRepository.findAll();
        assertThat(conversationList).hasSize(databaseSizeBeforeUpdate);
        Conversation testConversation = conversationList.get(conversationList.size() - 1);
        assertThat(testConversation.getConversationStatus()).isEqualTo(UPDATED_CONVERSATION_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingConversation() throws Exception {
        int databaseSizeBeforeUpdate = conversationRepository.findAll().size();

        // Create the Conversation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConversationMockMvc.perform(put("/api/conversations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conversation)))
            .andExpect(status().isBadRequest());

        // Validate the Conversation in the database
        List<Conversation> conversationList = conversationRepository.findAll();
        assertThat(conversationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConversation() throws Exception {
        // Initialize the database
        conversationService.save(conversation);

        int databaseSizeBeforeDelete = conversationRepository.findAll().size();

        // Delete the conversation
        restConversationMockMvc.perform(delete("/api/conversations/{id}", conversation.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Conversation> conversationList = conversationRepository.findAll();
        assertThat(conversationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

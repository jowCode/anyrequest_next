package de.jow.web.rest;

import de.jow.AnyrequestNextApp;
import de.jow.domain.UserRequest;
import de.jow.repository.UserRequestRepository;
import de.jow.service.UserRequestService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static de.jow.web.rest.TestUtil.sameInstant;
import static de.jow.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.jow.domain.enumeration.Urgency;
/**
 * Integration tests for the {@link UserRequestResource} REST controller.
 */
@SpringBootTest(classes = AnyrequestNextApp.class)
public class UserRequestResourceIT {

    private static final String DEFAULT_REQUESTING_USER = "AAAAAAAAAA";
    private static final String UPDATED_REQUESTING_USER = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Urgency DEFAULT_URGENCY = Urgency.HIGH;
    private static final Urgency UPDATED_URGENCY = Urgency.MEDIUM;

    private static final ZonedDateTime DEFAULT_VALID_TO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_VALID_TO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_CONTRIBUTOR_COUNT = 0;
    private static final Integer UPDATED_CONTRIBUTOR_COUNT = 1;

    private static final Boolean DEFAULT_HAS_CONTRIBUTED = false;
    private static final Boolean UPDATED_HAS_CONTRIBUTED = true;

    private static final Boolean DEFAULT_IS_BLOCKED = false;
    private static final Boolean UPDATED_IS_BLOCKED = true;

    @Autowired
    private UserRequestRepository userRequestRepository;

    @Autowired
    private UserRequestService userRequestService;

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

    private MockMvc restUserRequestMockMvc;

    private UserRequest userRequest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserRequestResource userRequestResource = new UserRequestResource(userRequestService);
        this.restUserRequestMockMvc = MockMvcBuilders.standaloneSetup(userRequestResource)
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
    public static UserRequest createEntity(EntityManager em) {
        UserRequest userRequest = new UserRequest()
            .requestingUser(DEFAULT_REQUESTING_USER)
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .urgency(DEFAULT_URGENCY)
            .validTo(DEFAULT_VALID_TO)
            .contributorCount(DEFAULT_CONTRIBUTOR_COUNT)
            .hasContributed(DEFAULT_HAS_CONTRIBUTED)
            .isBlocked(DEFAULT_IS_BLOCKED);
        return userRequest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserRequest createUpdatedEntity(EntityManager em) {
        UserRequest userRequest = new UserRequest()
            .requestingUser(UPDATED_REQUESTING_USER)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .urgency(UPDATED_URGENCY)
            .validTo(UPDATED_VALID_TO)
            .contributorCount(UPDATED_CONTRIBUTOR_COUNT)
            .hasContributed(UPDATED_HAS_CONTRIBUTED)
            .isBlocked(UPDATED_IS_BLOCKED);
        return userRequest;
    }

    @BeforeEach
    public void initTest() {
        userRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserRequest() throws Exception {
        int databaseSizeBeforeCreate = userRequestRepository.findAll().size();

        // Create the UserRequest
        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isCreated());

        // Validate the UserRequest in the database
        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeCreate + 1);
        UserRequest testUserRequest = userRequestList.get(userRequestList.size() - 1);
        assertThat(testUserRequest.getRequestingUser()).isEqualTo(DEFAULT_REQUESTING_USER);
        assertThat(testUserRequest.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testUserRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUserRequest.getUrgency()).isEqualTo(DEFAULT_URGENCY);
        assertThat(testUserRequest.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
        assertThat(testUserRequest.getContributorCount()).isEqualTo(DEFAULT_CONTRIBUTOR_COUNT);
        assertThat(testUserRequest.isHasContributed()).isEqualTo(DEFAULT_HAS_CONTRIBUTED);
        assertThat(testUserRequest.isIsBlocked()).isEqualTo(DEFAULT_IS_BLOCKED);
    }

    @Test
    @Transactional
    public void createUserRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userRequestRepository.findAll().size();

        // Create the UserRequest with an existing ID
        userRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        // Validate the UserRequest in the database
        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRequestingUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRequestRepository.findAll().size();
        // set the field null
        userRequest.setRequestingUser(null);

        // Create the UserRequest, which fails.

        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRequestRepository.findAll().size();
        // set the field null
        userRequest.setTitle(null);

        // Create the UserRequest, which fails.

        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRequestRepository.findAll().size();
        // set the field null
        userRequest.setDescription(null);

        // Create the UserRequest, which fails.

        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUrgencyIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRequestRepository.findAll().size();
        // set the field null
        userRequest.setUrgency(null);

        // Create the UserRequest, which fails.

        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValidToIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRequestRepository.findAll().size();
        // set the field null
        userRequest.setValidTo(null);

        // Create the UserRequest, which fails.

        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContributorCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = userRequestRepository.findAll().size();
        // set the field null
        userRequest.setContributorCount(null);

        // Create the UserRequest, which fails.

        restUserRequestMockMvc.perform(post("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserRequests() throws Exception {
        // Initialize the database
        userRequestRepository.saveAndFlush(userRequest);

        // Get all the userRequestList
        restUserRequestMockMvc.perform(get("/api/user-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].requestingUser").value(hasItem(DEFAULT_REQUESTING_USER)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].urgency").value(hasItem(DEFAULT_URGENCY.toString())))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(sameInstant(DEFAULT_VALID_TO))))
            .andExpect(jsonPath("$.[*].contributorCount").value(hasItem(DEFAULT_CONTRIBUTOR_COUNT)))
            .andExpect(jsonPath("$.[*].hasContributed").value(hasItem(DEFAULT_HAS_CONTRIBUTED.booleanValue())))
            .andExpect(jsonPath("$.[*].isBlocked").value(hasItem(DEFAULT_IS_BLOCKED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getUserRequest() throws Exception {
        // Initialize the database
        userRequestRepository.saveAndFlush(userRequest);

        // Get the userRequest
        restUserRequestMockMvc.perform(get("/api/user-requests/{id}", userRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userRequest.getId().intValue()))
            .andExpect(jsonPath("$.requestingUser").value(DEFAULT_REQUESTING_USER))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.urgency").value(DEFAULT_URGENCY.toString()))
            .andExpect(jsonPath("$.validTo").value(sameInstant(DEFAULT_VALID_TO)))
            .andExpect(jsonPath("$.contributorCount").value(DEFAULT_CONTRIBUTOR_COUNT))
            .andExpect(jsonPath("$.hasContributed").value(DEFAULT_HAS_CONTRIBUTED.booleanValue()))
            .andExpect(jsonPath("$.isBlocked").value(DEFAULT_IS_BLOCKED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserRequest() throws Exception {
        // Get the userRequest
        restUserRequestMockMvc.perform(get("/api/user-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserRequest() throws Exception {
        // Initialize the database
        userRequestService.save(userRequest);

        int databaseSizeBeforeUpdate = userRequestRepository.findAll().size();

        // Update the userRequest
        UserRequest updatedUserRequest = userRequestRepository.findById(userRequest.getId()).get();
        // Disconnect from session so that the updates on updatedUserRequest are not directly saved in db
        em.detach(updatedUserRequest);
        updatedUserRequest
            .requestingUser(UPDATED_REQUESTING_USER)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .urgency(UPDATED_URGENCY)
            .validTo(UPDATED_VALID_TO)
            .contributorCount(UPDATED_CONTRIBUTOR_COUNT)
            .hasContributed(UPDATED_HAS_CONTRIBUTED)
            .isBlocked(UPDATED_IS_BLOCKED);

        restUserRequestMockMvc.perform(put("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserRequest)))
            .andExpect(status().isOk());

        // Validate the UserRequest in the database
        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeUpdate);
        UserRequest testUserRequest = userRequestList.get(userRequestList.size() - 1);
        assertThat(testUserRequest.getRequestingUser()).isEqualTo(UPDATED_REQUESTING_USER);
        assertThat(testUserRequest.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testUserRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUserRequest.getUrgency()).isEqualTo(UPDATED_URGENCY);
        assertThat(testUserRequest.getValidTo()).isEqualTo(UPDATED_VALID_TO);
        assertThat(testUserRequest.getContributorCount()).isEqualTo(UPDATED_CONTRIBUTOR_COUNT);
        assertThat(testUserRequest.isHasContributed()).isEqualTo(UPDATED_HAS_CONTRIBUTED);
        assertThat(testUserRequest.isIsBlocked()).isEqualTo(UPDATED_IS_BLOCKED);
    }

    @Test
    @Transactional
    public void updateNonExistingUserRequest() throws Exception {
        int databaseSizeBeforeUpdate = userRequestRepository.findAll().size();

        // Create the UserRequest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserRequestMockMvc.perform(put("/api/user-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userRequest)))
            .andExpect(status().isBadRequest());

        // Validate the UserRequest in the database
        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserRequest() throws Exception {
        // Initialize the database
        userRequestService.save(userRequest);

        int databaseSizeBeforeDelete = userRequestRepository.findAll().size();

        // Delete the userRequest
        restUserRequestMockMvc.perform(delete("/api/user-requests/{id}", userRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserRequest> userRequestList = userRequestRepository.findAll();
        assertThat(userRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

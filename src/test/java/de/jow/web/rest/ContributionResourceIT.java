package de.jow.web.rest;

import de.jow.AnyrequestNextApp;
import de.jow.domain.Contribution;
import de.jow.repository.ContributionRepository;
import de.jow.service.ContributionService;
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

import de.jow.domain.enumeration.ContributionStatus;
/**
 * Integration tests for the {@link ContributionResource} REST controller.
 */
@SpringBootTest(classes = AnyrequestNextApp.class)
public class ContributionResourceIT {

    private static final String DEFAULT_CONTRIBUTING_USER = "AAAAAAAAAA";
    private static final String UPDATED_CONTRIBUTING_USER = "BBBBBBBBBB";

    private static final String DEFAULT_CONTRIBUTION_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_CONTRIBUTION_MESSAGE = "BBBBBBBBBB";

    private static final ContributionStatus DEFAULT_CONTRIBUTION_STATUS = ContributionStatus.PENDING;
    private static final ContributionStatus UPDATED_CONTRIBUTION_STATUS = ContributionStatus.APPROVED;

    @Autowired
    private ContributionRepository contributionRepository;

    @Autowired
    private ContributionService contributionService;

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

    private MockMvc restContributionMockMvc;

    private Contribution contribution;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContributionResource contributionResource = new ContributionResource(contributionService);
        this.restContributionMockMvc = MockMvcBuilders.standaloneSetup(contributionResource)
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
    public static Contribution createEntity(EntityManager em) {
        Contribution contribution = new Contribution()
            .contributingUser(DEFAULT_CONTRIBUTING_USER)
            .contributionMessage(DEFAULT_CONTRIBUTION_MESSAGE)
            .contributionStatus(DEFAULT_CONTRIBUTION_STATUS);
        return contribution;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contribution createUpdatedEntity(EntityManager em) {
        Contribution contribution = new Contribution()
            .contributingUser(UPDATED_CONTRIBUTING_USER)
            .contributionMessage(UPDATED_CONTRIBUTION_MESSAGE)
            .contributionStatus(UPDATED_CONTRIBUTION_STATUS);
        return contribution;
    }

    @BeforeEach
    public void initTest() {
        contribution = createEntity(em);
    }

    @Test
    @Transactional
    public void createContribution() throws Exception {
        int databaseSizeBeforeCreate = contributionRepository.findAll().size();

        // Create the Contribution
        restContributionMockMvc.perform(post("/api/contributions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contribution)))
            .andExpect(status().isCreated());

        // Validate the Contribution in the database
        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeCreate + 1);
        Contribution testContribution = contributionList.get(contributionList.size() - 1);
        assertThat(testContribution.getContributingUser()).isEqualTo(DEFAULT_CONTRIBUTING_USER);
        assertThat(testContribution.getContributionMessage()).isEqualTo(DEFAULT_CONTRIBUTION_MESSAGE);
        assertThat(testContribution.getContributionStatus()).isEqualTo(DEFAULT_CONTRIBUTION_STATUS);
    }

    @Test
    @Transactional
    public void createContributionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contributionRepository.findAll().size();

        // Create the Contribution with an existing ID
        contribution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContributionMockMvc.perform(post("/api/contributions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contribution)))
            .andExpect(status().isBadRequest());

        // Validate the Contribution in the database
        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkContributingUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = contributionRepository.findAll().size();
        // set the field null
        contribution.setContributingUser(null);

        // Create the Contribution, which fails.

        restContributionMockMvc.perform(post("/api/contributions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contribution)))
            .andExpect(status().isBadRequest());

        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContributionMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = contributionRepository.findAll().size();
        // set the field null
        contribution.setContributionMessage(null);

        // Create the Contribution, which fails.

        restContributionMockMvc.perform(post("/api/contributions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contribution)))
            .andExpect(status().isBadRequest());

        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContributions() throws Exception {
        // Initialize the database
        contributionRepository.saveAndFlush(contribution);

        // Get all the contributionList
        restContributionMockMvc.perform(get("/api/contributions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contribution.getId().intValue())))
            .andExpect(jsonPath("$.[*].contributingUser").value(hasItem(DEFAULT_CONTRIBUTING_USER)))
            .andExpect(jsonPath("$.[*].contributionMessage").value(hasItem(DEFAULT_CONTRIBUTION_MESSAGE)))
            .andExpect(jsonPath("$.[*].contributionStatus").value(hasItem(DEFAULT_CONTRIBUTION_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getContribution() throws Exception {
        // Initialize the database
        contributionRepository.saveAndFlush(contribution);

        // Get the contribution
        restContributionMockMvc.perform(get("/api/contributions/{id}", contribution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contribution.getId().intValue()))
            .andExpect(jsonPath("$.contributingUser").value(DEFAULT_CONTRIBUTING_USER))
            .andExpect(jsonPath("$.contributionMessage").value(DEFAULT_CONTRIBUTION_MESSAGE))
            .andExpect(jsonPath("$.contributionStatus").value(DEFAULT_CONTRIBUTION_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContribution() throws Exception {
        // Get the contribution
        restContributionMockMvc.perform(get("/api/contributions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContribution() throws Exception {
        // Initialize the database
        contributionService.save(contribution);

        int databaseSizeBeforeUpdate = contributionRepository.findAll().size();

        // Update the contribution
        Contribution updatedContribution = contributionRepository.findById(contribution.getId()).get();
        // Disconnect from session so that the updates on updatedContribution are not directly saved in db
        em.detach(updatedContribution);
        updatedContribution
            .contributingUser(UPDATED_CONTRIBUTING_USER)
            .contributionMessage(UPDATED_CONTRIBUTION_MESSAGE)
            .contributionStatus(UPDATED_CONTRIBUTION_STATUS);

        restContributionMockMvc.perform(put("/api/contributions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContribution)))
            .andExpect(status().isOk());

        // Validate the Contribution in the database
        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeUpdate);
        Contribution testContribution = contributionList.get(contributionList.size() - 1);
        assertThat(testContribution.getContributingUser()).isEqualTo(UPDATED_CONTRIBUTING_USER);
        assertThat(testContribution.getContributionMessage()).isEqualTo(UPDATED_CONTRIBUTION_MESSAGE);
        assertThat(testContribution.getContributionStatus()).isEqualTo(UPDATED_CONTRIBUTION_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingContribution() throws Exception {
        int databaseSizeBeforeUpdate = contributionRepository.findAll().size();

        // Create the Contribution

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContributionMockMvc.perform(put("/api/contributions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contribution)))
            .andExpect(status().isBadRequest());

        // Validate the Contribution in the database
        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContribution() throws Exception {
        // Initialize the database
        contributionService.save(contribution);

        int databaseSizeBeforeDelete = contributionRepository.findAll().size();

        // Delete the contribution
        restContributionMockMvc.perform(delete("/api/contributions/{id}", contribution.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contribution> contributionList = contributionRepository.findAll();
        assertThat(contributionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

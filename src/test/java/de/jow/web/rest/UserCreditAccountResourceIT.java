package de.jow.web.rest;

import de.jow.AnyrequestNextApp;
import de.jow.domain.UserCreditAccount;
import de.jow.repository.UserCreditAccountRepository;
import de.jow.service.UserCreditAccountService;
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

/**
 * Integration tests for the {@link UserCreditAccountResource} REST controller.
 */
@SpringBootTest(classes = AnyrequestNextApp.class)
public class UserCreditAccountResourceIT {

    private static final Integer DEFAULT_RECEIVED_CREDITS = 0;
    private static final Integer UPDATED_RECEIVED_CREDITS = 1;

    private static final Integer DEFAULT_USED_CREDITS = 0;
    private static final Integer UPDATED_USED_CREDITS = 1;

    private static final Integer DEFAULT_TOTAL_CREDITS = 0;
    private static final Integer UPDATED_TOTAL_CREDITS = 1;

    @Autowired
    private UserCreditAccountRepository userCreditAccountRepository;

    @Autowired
    private UserCreditAccountService userCreditAccountService;

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

    private MockMvc restUserCreditAccountMockMvc;

    private UserCreditAccount userCreditAccount;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserCreditAccountResource userCreditAccountResource = new UserCreditAccountResource(userCreditAccountService);
        this.restUserCreditAccountMockMvc = MockMvcBuilders.standaloneSetup(userCreditAccountResource)
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
    public static UserCreditAccount createEntity(EntityManager em) {
        UserCreditAccount userCreditAccount = new UserCreditAccount()
            .receivedCredits(DEFAULT_RECEIVED_CREDITS)
            .usedCredits(DEFAULT_USED_CREDITS)
            .totalCredits(DEFAULT_TOTAL_CREDITS);
        return userCreditAccount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCreditAccount createUpdatedEntity(EntityManager em) {
        UserCreditAccount userCreditAccount = new UserCreditAccount()
            .receivedCredits(UPDATED_RECEIVED_CREDITS)
            .usedCredits(UPDATED_USED_CREDITS)
            .totalCredits(UPDATED_TOTAL_CREDITS);
        return userCreditAccount;
    }

    @BeforeEach
    public void initTest() {
        userCreditAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserCreditAccount() throws Exception {
        int databaseSizeBeforeCreate = userCreditAccountRepository.findAll().size();

        // Create the UserCreditAccount
        restUserCreditAccountMockMvc.perform(post("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCreditAccount)))
            .andExpect(status().isCreated());

        // Validate the UserCreditAccount in the database
        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeCreate + 1);
        UserCreditAccount testUserCreditAccount = userCreditAccountList.get(userCreditAccountList.size() - 1);
        assertThat(testUserCreditAccount.getReceivedCredits()).isEqualTo(DEFAULT_RECEIVED_CREDITS);
        assertThat(testUserCreditAccount.getUsedCredits()).isEqualTo(DEFAULT_USED_CREDITS);
        assertThat(testUserCreditAccount.getTotalCredits()).isEqualTo(DEFAULT_TOTAL_CREDITS);
    }

    @Test
    @Transactional
    public void createUserCreditAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userCreditAccountRepository.findAll().size();

        // Create the UserCreditAccount with an existing ID
        userCreditAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserCreditAccountMockMvc.perform(post("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCreditAccount)))
            .andExpect(status().isBadRequest());

        // Validate the UserCreditAccount in the database
        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkReceivedCreditsIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCreditAccountRepository.findAll().size();
        // set the field null
        userCreditAccount.setReceivedCredits(null);

        // Create the UserCreditAccount, which fails.

        restUserCreditAccountMockMvc.perform(post("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCreditAccount)))
            .andExpect(status().isBadRequest());

        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUsedCreditsIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCreditAccountRepository.findAll().size();
        // set the field null
        userCreditAccount.setUsedCredits(null);

        // Create the UserCreditAccount, which fails.

        restUserCreditAccountMockMvc.perform(post("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCreditAccount)))
            .andExpect(status().isBadRequest());

        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalCreditsIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCreditAccountRepository.findAll().size();
        // set the field null
        userCreditAccount.setTotalCredits(null);

        // Create the UserCreditAccount, which fails.

        restUserCreditAccountMockMvc.perform(post("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCreditAccount)))
            .andExpect(status().isBadRequest());

        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserCreditAccounts() throws Exception {
        // Initialize the database
        userCreditAccountRepository.saveAndFlush(userCreditAccount);

        // Get all the userCreditAccountList
        restUserCreditAccountMockMvc.perform(get("/api/user-credit-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCreditAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].receivedCredits").value(hasItem(DEFAULT_RECEIVED_CREDITS)))
            .andExpect(jsonPath("$.[*].usedCredits").value(hasItem(DEFAULT_USED_CREDITS)))
            .andExpect(jsonPath("$.[*].totalCredits").value(hasItem(DEFAULT_TOTAL_CREDITS)));
    }
    
    @Test
    @Transactional
    public void getUserCreditAccount() throws Exception {
        // Initialize the database
        userCreditAccountRepository.saveAndFlush(userCreditAccount);

        // Get the userCreditAccount
        restUserCreditAccountMockMvc.perform(get("/api/user-credit-accounts/{id}", userCreditAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userCreditAccount.getId().intValue()))
            .andExpect(jsonPath("$.receivedCredits").value(DEFAULT_RECEIVED_CREDITS))
            .andExpect(jsonPath("$.usedCredits").value(DEFAULT_USED_CREDITS))
            .andExpect(jsonPath("$.totalCredits").value(DEFAULT_TOTAL_CREDITS));
    }

    @Test
    @Transactional
    public void getNonExistingUserCreditAccount() throws Exception {
        // Get the userCreditAccount
        restUserCreditAccountMockMvc.perform(get("/api/user-credit-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserCreditAccount() throws Exception {
        // Initialize the database
        userCreditAccountService.save(userCreditAccount);

        int databaseSizeBeforeUpdate = userCreditAccountRepository.findAll().size();

        // Update the userCreditAccount
        UserCreditAccount updatedUserCreditAccount = userCreditAccountRepository.findById(userCreditAccount.getId()).get();
        // Disconnect from session so that the updates on updatedUserCreditAccount are not directly saved in db
        em.detach(updatedUserCreditAccount);
        updatedUserCreditAccount
            .receivedCredits(UPDATED_RECEIVED_CREDITS)
            .usedCredits(UPDATED_USED_CREDITS)
            .totalCredits(UPDATED_TOTAL_CREDITS);

        restUserCreditAccountMockMvc.perform(put("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserCreditAccount)))
            .andExpect(status().isOk());

        // Validate the UserCreditAccount in the database
        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeUpdate);
        UserCreditAccount testUserCreditAccount = userCreditAccountList.get(userCreditAccountList.size() - 1);
        assertThat(testUserCreditAccount.getReceivedCredits()).isEqualTo(UPDATED_RECEIVED_CREDITS);
        assertThat(testUserCreditAccount.getUsedCredits()).isEqualTo(UPDATED_USED_CREDITS);
        assertThat(testUserCreditAccount.getTotalCredits()).isEqualTo(UPDATED_TOTAL_CREDITS);
    }

    @Test
    @Transactional
    public void updateNonExistingUserCreditAccount() throws Exception {
        int databaseSizeBeforeUpdate = userCreditAccountRepository.findAll().size();

        // Create the UserCreditAccount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserCreditAccountMockMvc.perform(put("/api/user-credit-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userCreditAccount)))
            .andExpect(status().isBadRequest());

        // Validate the UserCreditAccount in the database
        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserCreditAccount() throws Exception {
        // Initialize the database
        userCreditAccountService.save(userCreditAccount);

        int databaseSizeBeforeDelete = userCreditAccountRepository.findAll().size();

        // Delete the userCreditAccount
        restUserCreditAccountMockMvc.perform(delete("/api/user-credit-accounts/{id}", userCreditAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserCreditAccount> userCreditAccountList = userCreditAccountRepository.findAll();
        assertThat(userCreditAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

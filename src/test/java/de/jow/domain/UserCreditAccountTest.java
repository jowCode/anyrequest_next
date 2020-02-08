package de.jow.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.jow.web.rest.TestUtil;

public class UserCreditAccountTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserCreditAccount.class);
        UserCreditAccount userCreditAccount1 = new UserCreditAccount();
        userCreditAccount1.setId(1L);
        UserCreditAccount userCreditAccount2 = new UserCreditAccount();
        userCreditAccount2.setId(userCreditAccount1.getId());
        assertThat(userCreditAccount1).isEqualTo(userCreditAccount2);
        userCreditAccount2.setId(2L);
        assertThat(userCreditAccount1).isNotEqualTo(userCreditAccount2);
        userCreditAccount1.setId(null);
        assertThat(userCreditAccount1).isNotEqualTo(userCreditAccount2);
    }
}

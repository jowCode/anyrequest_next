package de.jow.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.jow.web.rest.TestUtil;

public class ContributionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contribution.class);
        Contribution contribution1 = new Contribution();
        contribution1.setId(1L);
        Contribution contribution2 = new Contribution();
        contribution2.setId(contribution1.getId());
        assertThat(contribution1).isEqualTo(contribution2);
        contribution2.setId(2L);
        assertThat(contribution1).isNotEqualTo(contribution2);
        contribution1.setId(null);
        assertThat(contribution1).isNotEqualTo(contribution2);
    }
}

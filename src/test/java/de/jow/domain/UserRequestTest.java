package de.jow.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.jow.web.rest.TestUtil;

public class UserRequestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserRequest.class);
        UserRequest userRequest1 = new UserRequest();
        userRequest1.setId(1L);
        UserRequest userRequest2 = new UserRequest();
        userRequest2.setId(userRequest1.getId());
        assertThat(userRequest1).isEqualTo(userRequest2);
        userRequest2.setId(2L);
        assertThat(userRequest1).isNotEqualTo(userRequest2);
        userRequest1.setId(null);
        assertThat(userRequest1).isNotEqualTo(userRequest2);
    }
}

package de.jow.web.rest.usersonly;

import de.jow.service.UserRequestService;
import de.jow.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContributingResource {

    private final Logger log = LoggerFactory.getLogger(ContributingResource.class);

    private static final String ENTITY_NAME = "contribution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRequestService userRequestService;

    private final UserService userService;

    public ContributingResource(
        final UserRequestService userRequestService,
        final UserService userService) {
        this.userRequestService = userRequestService;
        this.userService = userService;
    }
}

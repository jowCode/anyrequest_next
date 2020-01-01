package de.jow.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import de.jow.domain.enumeration.ContributionStatus;

/**
 * A Contribution.
 */
@Entity
@Table(name = "contribution")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contribution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "contributing_user", nullable = false)
    private String contributingUser;

    @NotNull
    @Column(name = "contribution_message", nullable = false)
    private String contributionMessage;

    @Enumerated(EnumType.STRING)
    @Column(name = "contribution_status")
    private ContributionStatus contributionStatus;

    @OneToOne
    @JoinColumn(unique = true)
    private Conversation conversation;

    @ManyToOne
    @JsonIgnoreProperties("contributions")
    private UserRequest userRequest;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContributingUser() {
        return contributingUser;
    }

    public Contribution contributingUser(String contributingUser) {
        this.contributingUser = contributingUser;
        return this;
    }

    public void setContributingUser(String contributingUser) {
        this.contributingUser = contributingUser;
    }

    public String getContributionMessage() {
        return contributionMessage;
    }

    public Contribution contributionMessage(String contributionMessage) {
        this.contributionMessage = contributionMessage;
        return this;
    }

    public void setContributionMessage(String contributionMessage) {
        this.contributionMessage = contributionMessage;
    }

    public ContributionStatus getContributionStatus() {
        return contributionStatus;
    }

    public Contribution contributionStatus(ContributionStatus contributionStatus) {
        this.contributionStatus = contributionStatus;
        return this;
    }

    public void setContributionStatus(ContributionStatus contributionStatus) {
        this.contributionStatus = contributionStatus;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public Contribution conversation(Conversation conversation) {
        this.conversation = conversation;
        return this;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public UserRequest getUserRequest() {
        return userRequest;
    }

    public Contribution userRequest(UserRequest userRequest) {
        this.userRequest = userRequest;
        return this;
    }

    public void setUserRequest(UserRequest userRequest) {
        this.userRequest = userRequest;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contribution)) {
            return false;
        }
        return id != null && id.equals(((Contribution) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Contribution{" +
            "id=" + getId() +
            ", contributingUser='" + getContributingUser() + "'" +
            ", contributionMessage='" + getContributionMessage() + "'" +
            ", contributionStatus='" + getContributionStatus() + "'" +
            "}";
    }
}

package de.jow.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import de.jow.domain.enumeration.Urgency;

/**
 * A UserRequest.
 */
@Entity
@Table(name = "user_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "requesting_user", nullable = false)
    private String requestingUser;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "urgency", nullable = false)
    private Urgency urgency;

    @NotNull
    @Column(name = "valid_to", nullable = false)
    private ZonedDateTime validTo;

    @NotNull
    @Min(value = 0)
    @Column(name = "contributor_count", nullable = false)
    private Integer contributorCount;

    @Column(name = "has_contributed")
    private Boolean hasContributed;

    @Column(name = "is_blocked")
    private Boolean isBlocked;

    @OneToMany(mappedBy = "userRequest")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contribution> contributions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRequestingUser() {
        return requestingUser;
    }

    public UserRequest requestingUser(String requestingUser) {
        this.requestingUser = requestingUser;
        return this;
    }

    public void setRequestingUser(String requestingUser) {
        this.requestingUser = requestingUser;
    }

    public String getTitle() {
        return title;
    }

    public UserRequest title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public UserRequest description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Urgency getUrgency() {
        return urgency;
    }

    public UserRequest urgency(Urgency urgency) {
        this.urgency = urgency;
        return this;
    }

    public void setUrgency(Urgency urgency) {
        this.urgency = urgency;
    }

    public ZonedDateTime getValidTo() {
        return validTo;
    }

    public UserRequest validTo(ZonedDateTime validTo) {
        this.validTo = validTo;
        return this;
    }

    public void setValidTo(ZonedDateTime validTo) {
        this.validTo = validTo;
    }

    public Integer getContributorCount() {
        return contributorCount;
    }

    public UserRequest contributorCount(Integer contributorCount) {
        this.contributorCount = contributorCount;
        return this;
    }

    public void setContributorCount(Integer contributorCount) {
        this.contributorCount = contributorCount;
    }

    public Boolean isHasContributed() {
        return hasContributed;
    }

    public UserRequest hasContributed(Boolean hasContributed) {
        this.hasContributed = hasContributed;
        return this;
    }

    public void setHasContributed(Boolean hasContributed) {
        this.hasContributed = hasContributed;
    }

    public Boolean isIsBlocked() {
        return isBlocked;
    }

    public UserRequest isBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
        return this;
    }

    public void setIsBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
    }

    public Set<Contribution> getContributions() {
        return contributions;
    }

    public UserRequest contributions(Set<Contribution> contributions) {
        this.contributions = contributions;
        return this;
    }

    public UserRequest addContribution(Contribution contribution) {
        this.contributions.add(contribution);
        contribution.setUserRequest(this);
        return this;
    }

    public UserRequest removeContribution(Contribution contribution) {
        this.contributions.remove(contribution);
        contribution.setUserRequest(null);
        return this;
    }

    public void setContributions(Set<Contribution> contributions) {
        this.contributions = contributions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserRequest)) {
            return false;
        }
        return id != null && id.equals(((UserRequest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserRequest{" +
            "id=" + getId() +
            ", requestingUser='" + getRequestingUser() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", urgency='" + getUrgency() + "'" +
            ", validTo='" + getValidTo() + "'" +
            ", contributorCount=" + getContributorCount() +
            ", hasContributed='" + isHasContributed() + "'" +
            ", isBlocked='" + isIsBlocked() + "'" +
            "}";
    }
}

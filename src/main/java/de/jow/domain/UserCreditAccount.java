package de.jow.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A UserCreditAccount.
 */
@Entity
@Table(name = "user_credit_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserCreditAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "received_credits", nullable = false)
    private Integer receivedCredits;

    @NotNull
    @Min(value = 0)
    @Column(name = "used_credits", nullable = false)
    private Integer usedCredits;

    @NotNull
    @Min(value = 0)
    @Column(name = "total_credits", nullable = false)
    private Integer totalCredits;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getReceivedCredits() {
        return receivedCredits;
    }

    public UserCreditAccount receivedCredits(Integer receivedCredits) {
        this.receivedCredits = receivedCredits;
        return this;
    }

    public void setReceivedCredits(Integer receivedCredits) {
        this.receivedCredits = receivedCredits;
    }

    public Integer getUsedCredits() {
        return usedCredits;
    }

    public UserCreditAccount usedCredits(Integer usedCredits) {
        this.usedCredits = usedCredits;
        return this;
    }

    public void setUsedCredits(Integer usedCredits) {
        this.usedCredits = usedCredits;
    }

    public Integer getTotalCredits() {
        return totalCredits;
    }

    public UserCreditAccount totalCredits(Integer totalCredits) {
        this.totalCredits = totalCredits;
        return this;
    }

    public void setTotalCredits(Integer totalCredits) {
        this.totalCredits = totalCredits;
    }

    public User getUser() {
        return user;
    }

    public UserCreditAccount user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserCreditAccount)) {
            return false;
        }
        return id != null && id.equals(((UserCreditAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserCreditAccount{" +
            "id=" + getId() +
            ", receivedCredits=" + getReceivedCredits() +
            ", usedCredits=" + getUsedCredits() +
            ", totalCredits=" + getTotalCredits() +
            "}";
    }
}

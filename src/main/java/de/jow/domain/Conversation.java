package de.jow.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import de.jow.domain.enumeration.ConversationStatus;

/**
 * A Conversation.
 */
@Entity
@Table(name = "conversation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Conversation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "conversation_status")
    private ConversationStatus conversationStatus;

    @OneToMany(mappedBy = "conversation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ChatMessage> chatMessages = new HashSet<>();

    @OneToOne(mappedBy = "conversation")
    @JsonIgnore
    private Contribution contribution;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ConversationStatus getConversationStatus() {
        return conversationStatus;
    }

    public Conversation conversationStatus(ConversationStatus conversationStatus) {
        this.conversationStatus = conversationStatus;
        return this;
    }

    public void setConversationStatus(ConversationStatus conversationStatus) {
        this.conversationStatus = conversationStatus;
    }

    public Set<ChatMessage> getChatMessages() {
        return chatMessages;
    }

    public Conversation chatMessages(Set<ChatMessage> chatMessages) {
        this.chatMessages = chatMessages;
        return this;
    }

    public Conversation addChatMessage(ChatMessage chatMessage) {
        this.chatMessages.add(chatMessage);
        chatMessage.setConversation(this);
        return this;
    }

    public Conversation removeChatMessage(ChatMessage chatMessage) {
        this.chatMessages.remove(chatMessage);
        chatMessage.setConversation(null);
        return this;
    }

    public void setChatMessages(Set<ChatMessage> chatMessages) {
        this.chatMessages = chatMessages;
    }

    public Contribution getContribution() {
        return contribution;
    }

    public Conversation contribution(Contribution contribution) {
        this.contribution = contribution;
        return this;
    }

    public void setContribution(Contribution contribution) {
        this.contribution = contribution;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conversation)) {
            return false;
        }
        return id != null && id.equals(((Conversation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Conversation{" +
            "id=" + getId() +
            ", conversationStatus='" + getConversationStatus() + "'" +
            "}";
    }
}

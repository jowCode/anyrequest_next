package de.jow.service.dto;

import de.jow.domain.enumeration.Urgency;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

public class NewRequestDTO {

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Urgency urgency;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Urgency getUrgency() {
        return urgency;
    }

    public void setUrgency(Urgency urgency) {
        this.urgency = urgency;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NewRequestDTO)) return false;

        NewRequestDTO that = (NewRequestDTO) o;

        if (!getTitle().equals(that.getTitle())) return false;
        if (!getDescription().equals(that.getDescription())) return false;
        return getUrgency() == that.getUrgency();
    }

    @Override
    public int hashCode() {
        int result = getTitle().hashCode();
        result = 31 * result + getDescription().hashCode();
        result = 31 * result + getUrgency().hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "NewRequestDTO{" +
            "title='" + title + '\'' +
            ", description='" + description + '\'' +
            ", urgency=" + urgency +
            '}';
    }
}

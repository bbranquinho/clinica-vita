package org.fpu.clinica.escala;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.fpu.clinica.itemescala.ItemEscalaAtendimento;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.utils.BaseEntity;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tb_escala_atendimento")
@AttributeOverride(name = "id", column = @Column(name = "id_escala_atendimento"))
public class EscalaAtendimento extends BaseEntity<Long> {

    private static final long serialVersionUID = 1L;

    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "id_escala_medico", nullable = true)
    private Medico medico;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "escalaAtendimento")
    @Fetch(FetchMode.SUBSELECT)
    private List<ItemEscalaAtendimento> itemEscalaAtendimento;

    @NotNull(message = "Não pode estar em branco") // JSR 303 Validated ?
    // @Past(message = "insira uma data valida") // JSR 303 Validated ?
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_modificacao")
    private Date dataModificacao;

    public EscalaAtendimento() {
        // TODO Auto-generated constructor stub
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public List<ItemEscalaAtendimento> getItemEscalaAtendimento() {
        return itemEscalaAtendimento;
    }

    public void setItemEscalaAtendimento(List<ItemEscalaAtendimento> itemEscalaAtendimento) {
        this.itemEscalaAtendimento = itemEscalaAtendimento;
    }

    public Date getDataModificacao() {
        return dataModificacao;
    }

    public void setDataModificacao(Date dataModificacao) {
        this.dataModificacao = dataModificacao;
    }
}

package org.fpu.clinica.itemescala;

import org.fpu.clinica.escala.EscalaAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemEscalaAtendimentoRepository extends JpaRepository<ItemEscalaAtendimento,Long>{

    public List<ItemEscalaAtendimento> findByEscalaAtendimento(EscalaAtendimento escalaAtendimento);

    @Query("select i from ItemEscalaAtendimento i where i.escalaAtendimento = ?1  and i.diaSemana = ?2")
    ItemEscalaAtendimento findByEscalaAndDiaSemana(EscalaAtendimento escalaAtendimento, String diaSemana);

}

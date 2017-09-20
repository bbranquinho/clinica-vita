package org.fpu.clinica.itemescala;

import org.fpu.clinica.escala.EscalaAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemEscalaAtendimentoRepository extends JpaRepository<ItemEscalaAtendimento,Long>{

    public List<ItemEscalaAtendimento> findByEscalaAtendimento(EscalaAtendimento escalaAtendimento);

}

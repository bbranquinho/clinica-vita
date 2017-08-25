package org.fpu.clinica.funcionario;

import java.util.List;

import org.fpu.clinica.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario,Long>{

	public List<Funcionario> findByUser(Usuario user);
}

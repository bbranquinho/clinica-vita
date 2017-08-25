package org.fpu.clinica.permissao;

import java.util.List;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = ServicePath.PERMISSAO_PATH)
public class PermissaoService extends GenericService<Permissao, Long> {


	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	@RequestMapping(value = "/findRole/{role}", method = RequestMethod.GET)
	public Permissao findRole(@PathVariable("role") String role) {
		return this.permissaoRepository.findByRole(role);
	}
	
	@Override
	public List<Permissao> findAll() {
		return super.findAll();
	}
	
	/*@RequestMapping(value = "/findRole", method = RequestMethod.GET)
	public Permissao findRole(@RequestBody String role) {
		return this.permissaoRepository.findByRole(role);
	}*/
}

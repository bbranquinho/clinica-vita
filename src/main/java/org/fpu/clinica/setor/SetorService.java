package org.fpu.clinica.setor;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.SETOR_PATH)
public class SetorService extends GenericService<Setor, Long> {
	
	@Autowired
	private SetorRepository setorRepository;

	@Override
	public ResponseEntity<?> deletar(@RequestBody @Validated Setor setor) {
		Setor setorDelete = this.setorRepository.findOne(setor.getId());
		
		return super.deletar(setorDelete);
		
	}
}

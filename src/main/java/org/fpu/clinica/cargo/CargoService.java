package org.fpu.clinica.cargo;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.CARGO_PATH)
public class CargoService extends GenericService<Cargo, Long> {

	@Autowired
	private CargoRepository cargoRepository;

	@Override
	public ResponseEntity<?> deletar(@RequestBody @Validated Cargo cargo) {
		
		Cargo cargoDelete = this.cargoRepository.findOne(cargo.getId());

		return super.deletar(cargoDelete);
	}
	
	

}

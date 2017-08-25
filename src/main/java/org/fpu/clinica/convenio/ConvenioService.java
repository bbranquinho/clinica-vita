package org.fpu.clinica.convenio;

import java.util.List;

import javax.transaction.Transactional;

import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.MedicoRepository;
import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.CONVENIO_PATH)
public class ConvenioService extends GenericService<Convenio, Long> {

	@Autowired
	MedicoRepository medicoRepository;
	
	@Autowired
	ConvenioRepository convenioRepository;
	
	FieldsErrorDetalhe fieldsErrorDetalhe = new FieldsErrorDetalhe();
	Message message = new Message();
	

	@Transactional
	@RequestMapping(value = "/findByMedico/{medicoId}", method = RequestMethod.GET)
	public ResponseEntity<?> findAgendaByMedico( @PathVariable("medicoId") Long medicoId) {	
		
		
		// List<String> msg = new ArrayList<String>();

		
		
		Medico medico = medicoRepository.findOne(medicoId);
		
		if (medico == null) {
			
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		
		List<Convenio> convenio = convenioRepository.findByMedicos(medico);

		

		

		// return
		// ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
		message.AddField("mensagem", "Carregado com sucesso");
		message.setData(convenio);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	
	
	
}

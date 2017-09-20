package org.fpu.clinica.escala;

import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.itemescala.ItemEscalaAtendimento;
import org.fpu.clinica.itemescala.ItemEscalaAtendimentoRepository;
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

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping(path = ServicePath.ESCALA_ATENDIMENTO_PATH)
public class EscalaAtendimentoService extends GenericService<EscalaAtendimento, Long> {

	@Autowired
	private ItemEscalaAtendimentoRepository itemEscalaAtendimentoRepository;

	@Autowired
	private EscalaAtendimentoRepository escalaAtendimentoRepository;

	@Autowired
	private MedicoRepository medicoRepository;

	FieldsErrorDetalhe fieldsErrorDetalhe = new FieldsErrorDetalhe();
	Message message = new Message();

	@Transactional
	@RequestMapping(value = "/findByMedico/{medicoId}", method = RequestMethod.GET)
	public ResponseEntity<?> findEscalaByMedico(@PathVariable("medicoId") Long medicoId) {


		// List<String> msg = new ArrayList<String>();



		Medico medico = medicoRepository.findOne(medicoId);

		if (medico == null) {

			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}


		EscalaAtendimento escalaAtendimento = escalaAtendimentoRepository.findByMedico(medico);

		List<ItemEscalaAtendimento> itemEscalaAtendimento = itemEscalaAtendimentoRepository.findByEscalaAtendimento(escalaAtendimento);


		if (itemEscalaAtendimento.isEmpty()) {

			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}



		// return
		// ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
		message.AddField("mensagem", "Carregado com sucesso");
		message.setData(itemEscalaAtendimento);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}




}

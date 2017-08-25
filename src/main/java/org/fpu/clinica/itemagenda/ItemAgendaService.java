package org.fpu.clinica.itemagenda;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.fpu.clinica.agenda.Agenda;
import org.fpu.clinica.agenda.AgendaRepository;
import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.MedicoRepository;
import org.fpu.clinica.paciente.Paciente;
import org.fpu.clinica.paciente.PacienteRepository;
import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.ITEM_AGENDA_PATH)
public class ItemAgendaService extends GenericService<ItemAgenda, Long> {

	@Autowired
	private ItemAgendaRepository itemAgendaRepository;
	
	@Autowired
	private PacienteRepository pacienteRepository;
	
	@Autowired
	private AgendaRepository agendaRepository;
	
	@Autowired
	private MedicoRepository medicoRepository;
	
	
	
	FieldsErrorDetalhe fieldsErrorDetalhe = new FieldsErrorDetalhe();
	Message message = new Message();
	
	
	
	@Override
	public ResponseEntity<?> insert(@RequestBody  @Validated ItemAgenda itemAgenda, Errors erros) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, erros)) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
		
	//	if((itemAgenda.getAgenda().getDataHoraInicialConsulta().getTime() - DataSalva.getTime()) / (1000 * 60 * 60 * 24) == 5)
		//if((itemAgenda.getAgenda().getDataHoraInicialConsulta().getTime() - itemAgenda.getAgenda().getDataHoraFinalConsulta().getTime()) / (1000 * 60 * 60 * 24) == 5)
		Calendar calDataInicial = Calendar.getInstance();
		calDataInicial.setTime(itemAgenda.getAgenda().getDataHoraInicialConsulta());
		
		Calendar calDataFinal = Calendar.getInstance();
		calDataFinal.setTime(itemAgenda.getAgenda().getDataHoraFinalConsulta());
		
		if(calDataInicial.compareTo(calDataFinal) == 1){
			List<String> mensagensErro;
			mensagensErro = new ArrayList<String>();
			mensagensErro.add(String.format(" %s : %s", "Data Final",
						"Data final não pode ser maior que a data Inicial"));
			
			fieldsErrorDetalhe.AddField("DATAFINAL", "error");
			
			fieldsErrorDetalhe.setFieldsErrorMessages(mensagensErro);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
	    
	    
		Agenda agendaSave = itemAgenda.getAgenda();
		agendaSave = agendaRepository.save(agendaSave);
		
		itemAgenda.setAgenda(agendaSave);
		
		
		
		return super.insert(itemAgenda, erros);
	}
	
	
	
	@Override
	public ResponseEntity<?> update(@RequestBody  @Validated ItemAgenda itemAgenda, Errors erros) {
		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, erros)) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
		
	//	if((itemAgenda.getAgenda().getDataHoraInicialConsulta().getTime() - DataSalva.getTime()) / (1000 * 60 * 60 * 24) == 5)
		//if((itemAgenda.getAgenda().getDataHoraInicialConsulta().getTime() - itemAgenda.getAgenda().getDataHoraFinalConsulta().getTime()) / (1000 * 60 * 60 * 24) == 5)
		Calendar calDataInicial = Calendar.getInstance();
		calDataInicial.setTime(itemAgenda.getAgenda().getDataHoraInicialConsulta());
		
		Calendar calDataFinal = Calendar.getInstance();
		calDataFinal.setTime(itemAgenda.getAgenda().getDataHoraFinalConsulta());
		
		if(calDataInicial.compareTo(calDataFinal) == 1){
			List<String> mensagensErro;
			mensagensErro = new ArrayList<String>();
			mensagensErro.add(String.format(" %s : %s", "Data Final",
						"Data final não pode ser maior que a data Inicial"));
			
			fieldsErrorDetalhe.AddField("DATAFINAL", "error");
			
			fieldsErrorDetalhe.setFieldsErrorMessages(mensagensErro);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
		
		if(itemAgenda.getPaciente() == null){
			List<String> mensagensErro;
			mensagensErro = new ArrayList<String>();
			mensagensErro.add(String.format(" %s : %s", "Paciente",
						"Paciente não pode estar em branco"));
			
			fieldsErrorDetalhe.AddField("PACIENTE", "error");
			
			fieldsErrorDetalhe.setFieldsErrorMessages(mensagensErro);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}
	    
	    ItemAgenda itemAgendaAux = itemAgendaRepository.findOne(itemAgenda.getId());
	    Paciente paciente = pacienteRepository.findOne(itemAgenda.getPaciente().getId());
	    
	    itemAgendaAux.setPaciente(paciente);
		itemAgendaAux.setStatusAgenda(TipoStatusAgenda.AGUARDANDOAUTORIZACAO.getDescricao());
				
		return super.update(itemAgendaAux, erros);
	}
	
	
	
	@RequestMapping(path = "/gerarhorario")
	@Transactional
	public ResponseEntity<?>  gerarAgendamento() {

		SimpleDateFormat formatterb = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date dataHoraConsulta = null;
        Date dataHoraTerminoConsulta = null;
		try {
			dataHoraConsulta = formatterb.parse("04/06/2017 08:30");
			dataHoraTerminoConsulta = formatterb.parse("04/06/2017 10:30");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
		Agenda agenda = agendaRepository.findBydataHoraInicialConsulta(dataHoraConsulta);
		
		//List<ItemAgenda> itensAgenda = itemAgendaRepository.findByAgenda(itemAgenda.getAgenda());
		
		if(agenda == null){
			
			
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            Date dataAgendamento = null;
			try {
				dataAgendamento = formatter.parse("10/10/1987");
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            
			
		
            
			Agenda agendaSave = new Agenda(3,dataAgendamento, dataHoraConsulta,dataHoraTerminoConsulta);
			agendaSave = agendaRepository.save(agendaSave);
			
			
			message.AddField("mensagem", "Salvo com sucesso");
			message.setData(agendaSave);
			
			for(int i = 0; i < agendaSave.getMax_qtd_itemAgenda(); i++){
				
				
				
				
				Medico medico = medicoRepository.findOne(2L);
				if(medico != null){
					
					BigDecimal valorConsulta = new BigDecimal("200.00");
					ItemAgenda itemAgendaSave = new ItemAgenda(agendaSave,medico,valorConsulta,TipoAgenda.CONSULTA.getDescricao(),TipoStatusAgenda.DISPONIVEL.getDescricao());
					
					itemAgendaRepository.save(itemAgendaSave);
				}
				
				
				
			}
			
			
		}

		/*itemAgenda = this.itemAgendaRepository.save(itemAgenda);

		if (itemAgenda.getId() == null) {
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}

		// return
		// ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
		message.AddField("mensagem", "Salvo com sucesso");
		message.setData(itemAgenda);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}*/
		
		return ResponseEntity.status(HttpStatus.OK).body(message);
		
	}
	
	@RequestMapping(path = "/findagenda")
	//@Transactional
	public List<ItemAgenda>  findAgenda() {

		
			List<ItemAgenda> itensgendas = itemAgendaRepository.findAll();
			
			
			/*for(int i = 0; i < 3; i++){
				
			}
			itemAgendaSave.setAgenda(agenda);*/
			
		

		/*itemAgenda = this.itemAgendaRepository.save(itemAgenda);

		if (itemAgenda.getId() == null) {
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}

		// return
		// ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
		message.AddField("mensagem", "Salvo com sucesso");
		message.setData(itemAgenda);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}*/
		
			return itensgendas;
			
			
		
	}
	
	
	
	@RequestMapping(path = "/find_horario_agendamento/{dataHoraDisponivel}/{medicoId}")
	//@Transactional
	public List<ItemAgenda>  findHorarioAgendamento(@PathVariable("dataHoraDisponivel") String dataHoraDisponivel, @PathVariable("medicoId") Long medico) {
		SimpleDateFormat formatterb = new SimpleDateFormat("dd-MM-yyyy HH:mm");
        Date dataHoraAgendamentoIntervaloInicial = null;
        Date dataHoraAgendamentoIntervaloFinal = null;

        


		try {
			
			dataHoraAgendamentoIntervaloInicial = formatterb.parse(dataHoraDisponivel + " 00:00");
			dataHoraAgendamentoIntervaloFinal = formatterb.parse(dataHoraDisponivel + " 23:59");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        	List<ItemAgenda> itensgendas = new ArrayList<>();
        
        	
        	Medico medicoAux = medicoRepository.findOne(medico);
        	if(medicoAux != null){
        		itensgendas = itemAgendaRepository.findbyDateAgenda(dataHoraAgendamentoIntervaloInicial,dataHoraAgendamentoIntervaloFinal, medicoAux);
        	}
        	
			 
			
			
		
		
			return itensgendas;
		
	}
	
	
	@Transactional
	@RequestMapping(value = "/findCompromissoPaciente/{idPaciente}", method = RequestMethod.GET)
	public ResponseEntity<?> findCompromissosPaciente( @PathVariable("idPaciente") Long id) {	
		
		
		Paciente pacienteAux = pacienteRepository.findOne(id);
		
		List<ItemAgenda> itemAgenda = itemAgendaRepository.findCompromissosPaciente(pacienteAux);

		message.AddField("mensagem", "Load Medicos success");
		message.setData(itemAgenda);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	
	@Transactional
	@RequestMapping(value = "/findByMedico/{medicoId}", method = RequestMethod.GET)
	public ResponseEntity<?> findAgendaByMedico( @PathVariable("medicoId") Long medicoId) {	
		
		
		// List<String> msg = new ArrayList<String>();

		
		
		Medico medico = medicoRepository.findOne(medicoId);
		
		if (medico == null) {
			
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
		
		List<ItemAgenda> itensAgenda = itemAgendaRepository.findByMedico(medico);

		

		

		// return
		// ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
		message.AddField("mensagem", "Salvo com sucesso");
		message.setData(itensAgenda);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	@RequestMapping(value = "/tipo_agenda", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> returnTiposAgenda() {
		
		 String [] listTipoAgenda = new String[TipoAgenda.values().length] ;
		 int i = 0;
		 for (TipoAgenda tipoAgenda: TipoAgenda.values()) {
			 listTipoAgenda[i] = tipoAgenda.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoAgenda);
	}
	
	@RequestMapping(value = "/status_agenda", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> returnStatusAgendas() {
		
		 String [] listTipoStatusAgenda = new String[TipoStatusAgenda.values().length] ;
		 int i = 0;
		 for (TipoStatusAgenda tipoStatusAgenda: TipoStatusAgenda.values()) {
			 listTipoStatusAgenda[i] = tipoStatusAgenda.getDescricao();
			 i++;
		}
		 
		return Arrays.asList(listTipoStatusAgenda);
	}
	
	 @RequestMapping(value = "/data_agendamento", method = RequestMethod.GET)
	 @ResponseBody
	public List<String> getMatriculaPaciente() {
		 
		 
			
			Date data = new Date();  
			SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yyyy");  
			String dataFormatada = formatador.format(data);
			
			String[] dataAgendamento = new String[1];
			dataAgendamento [0]	 = dataFormatada;
			
			
		 
		return Arrays.asList(dataAgendamento);
	}
	
	

	
	
}

package org.fpu.clinica.itemagenda;

import org.fpu.clinica.agenda.Agenda;
import org.fpu.clinica.agenda.AgendaRepository;
import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.escala.EscalaAtendimento;
import org.fpu.clinica.escala.EscalaAtendimentoRepository;
import org.fpu.clinica.itemescala.ItemEscalaAtendimento;
import org.fpu.clinica.itemescala.ItemEscalaAtendimentoRepository;
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
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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

	@Autowired
	private EscalaAtendimentoRepository escalaAtendimentoRepository;

	@Autowired
	private ItemEscalaAtendimentoRepository itensEscalaAtendimentoRepository;



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



	@RequestMapping(path = "/gerar_agendamento", method = RequestMethod.POST)
	@Transactional
	public ResponseEntity<?>  gerarAgendamento(@RequestBody PeriodoAgendamento periodoAgendamento) {


		/*verifica se ja existe agendamentos no periodo informado*/
		if(checkQtdItensAgenda(periodoAgendamento) == -1){
			message.AddField("mensagem", "Já existem datas cadastradas neste periodo.");
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}




		SimpleDateFormat formatterb = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		Date diaHoraInicialAux = null;
		Date diaHoraFinalAux = null;
		Date periodoInicialAux = null;
		Date periodoFinalAux = null;




		/*atribui hora e minutos no periodo informado*/
		periodoInicialAux = periodoAgendamento.getPeriodoInicial();
		periodoInicialAux.setHours(0);
		periodoInicialAux.setMinutes(0);

		periodoFinalAux = periodoAgendamento.getPeriodoFinal();
		periodoFinalAux.setHours(23);
		periodoFinalAux.setMinutes(59);





		/*Atribui o periodo ao calender para comparação*/
		Calendar calPeriodoInicialAux = Calendar.getInstance();
		calPeriodoInicialAux.setTime(periodoInicialAux);

		Calendar calPeriodoFinalAux = Calendar.getInstance();
		calPeriodoFinalAux.setTime(periodoFinalAux);

		/*Busca o Medico */
		Medico medico = medicoRepository.findOne(periodoAgendamento.getMedicoId());

		/*enquanto o periodo inicial for menor que o final gera os horarios*/
		while(calPeriodoInicialAux.before(calPeriodoFinalAux)) {

			EscalaAtendimento escalaAtendimento = escalaAtendimentoRepository.findByMedico(medico);

			String diaSemana = getDayWeek(calPeriodoInicialAux.getTime().getDay());

			ItemEscalaAtendimento itemEscalaAtendimento = itensEscalaAtendimentoRepository.findByEscalaAndDiaSemana
					(escalaAtendimento, diaSemana);

			if (itemEscalaAtendimento != null) {



				diaHoraInicialAux = calPeriodoInicialAux.getTime();
				diaHoraInicialAux.setHours(itemEscalaAtendimento.getHoraEntrada().getHours());
				diaHoraInicialAux.setMinutes(itemEscalaAtendimento.getHoraEntrada().getMinutes());

				diaHoraFinalAux = calPeriodoInicialAux.getTime();

				diaHoraFinalAux.setHours(itemEscalaAtendimento.getHoraSaida().getHours());
				diaHoraFinalAux.setMinutes(itemEscalaAtendimento.getHoraSaida().getMinutes());




				Calendar calDiaHoraInicialAux = Calendar.getInstance();
				calDiaHoraInicialAux.setTime(diaHoraInicialAux);

				Calendar calDiaHoraFinalAux = Calendar.getInstance();
				calDiaHoraFinalAux.setTime(diaHoraFinalAux);

				while (calDiaHoraInicialAux.before(calDiaHoraFinalAux)) {
					Date diaHoraConsultaFinal = calDiaHoraInicialAux.getTime();
					Calendar calDiaHoraConsultaFinal = Calendar.getInstance();
					calDiaHoraConsultaFinal.setTime(diaHoraConsultaFinal);
					calDiaHoraConsultaFinal.add(Calendar.MINUTE,
							+itemEscalaAtendimento.getIntervaloAgendamento());

					Agenda agendaSave = new Agenda(itemEscalaAtendimento.getQuantidadeVagas(), new Date(),
							calDiaHoraInicialAux.getTime(), calDiaHoraConsultaFinal.getTime());

					agendaSave = agendaRepository.save(agendaSave);

					for (int i = 0; i < itemEscalaAtendimento.getQuantidadeVagas(); i++) {


						BigDecimal valorConsulta = new BigDecimal("200.00");
						ItemAgenda itemAgendaSave = new ItemAgenda(agendaSave, medico, valorConsulta, TipoAgenda.CONSULTA.getDescricao(), TipoStatusAgenda.DISPONIVEL.getDescricao());

						itemAgendaRepository.save(itemAgendaSave);


					}

					calDiaHoraInicialAux.add(Calendar.MINUTE,
							+itemEscalaAtendimento.getIntervaloAgendamento());
				}

			}

			calPeriodoInicialAux.add(Calendar.DAY_OF_MONTH,
					+1);
		}


		message.AddField("mensagem", "Salvo com sucesso");
		//message.setData(itemAgenda);
		return ResponseEntity.status(HttpStatus.OK).body(message);


	}




	public String getDayWeek(int day){
		if(day == 0) return "Segunda-Feira";
		else if(day == 1) return "Terça-Feira";
		else if(day == 2) return "Quarta-Feira";
		else if(day == 3) return "Quinta-Feira";
		else if(day == 4) return "Sexta-Feira";
		else if(day == 5) return "Sabado";

		return "Domingo";


	}


	public int checkQtdItensAgenda(PeriodoAgendamento periodoAgendamento ){

		SimpleDateFormat formatterb = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		Date diaHoraInicialAux = null;
		Date diaHoraFinalAux = null;
		Date periodoInicialAux = null;
		Date periodoFinalAux = null;



		diaHoraInicialAux = periodoAgendamento.getPeriodoInicial();
		diaHoraInicialAux.setHours(0);
		diaHoraInicialAux.setMinutes(0);

		diaHoraFinalAux = periodoAgendamento.getPeriodoInicial();
		diaHoraFinalAux.setHours(23);
		diaHoraFinalAux.setMinutes(59);

		periodoInicialAux = periodoAgendamento.getPeriodoInicial();
		periodoInicialAux.setHours(0);
		periodoInicialAux.setMinutes(0);

		periodoFinalAux = periodoAgendamento.getPeriodoFinal();
		periodoInicialAux.setHours(23);
		periodoInicialAux.setMinutes(59);




		Calendar calDiaHoraInicialAux = Calendar.getInstance();
		calDiaHoraInicialAux.setTime(diaHoraInicialAux);

		Calendar calDiaHoraFinalAux = Calendar.getInstance();
		calDiaHoraFinalAux.setTime(diaHoraFinalAux);

		Calendar calPeriodoInicialAux = Calendar.getInstance();
		calDiaHoraInicialAux.setTime(periodoInicialAux);

		Calendar calPeriodoFinalAux = Calendar.getInstance();
		calDiaHoraInicialAux.setTime(periodoFinalAux);


		Medico medico = medicoRepository.findOne(periodoAgendamento.getMedicoId());


		List<ItemAgenda> itensAgendas = itemAgendaRepository.findbyDateAgenda(calDiaHoraInicialAux.getTime(),
				calPeriodoFinalAux.getTime(), medico);
		if(itensAgendas.size() > 0){
			return -1;
		}

		return 0;
	}

	@RequestMapping(path = "/findagenda")
	//@Transactional
	public List<ItemAgenda>  findAgenda() {


		List<ItemAgenda> itensgendas = itemAgendaRepository.findAll();
			

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

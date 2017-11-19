package org.fpu.test.clinica.domain;

import org.apache.log4j.Logger;
import org.fpu.clinica.itemagenda.ItemAgenda;
import org.fpu.clinica.itemagenda.ItemAgendaRepository;
import org.fpu.test.clinica.utils.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;


public class ItemAgendaRepositoryTest extends BaseTest {
	
	private final Logger LOGGER = Logger.getLogger(this.getClass());
	
	@Autowired
	private ItemAgendaRepository itemItemAgendaRepository;
	
	@Test
	public void findAllTest() {
		List<ItemAgenda> itemItemAgendas= this.itemItemAgendaRepository.findAll();

		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Test FindAll(): " + itemItemAgendas);
		}
		
		LOGGER.debug(itemItemAgendas);

		assertNotNull(itemItemAgendas);
		assertTrue(itemItemAgendas.size() > 0);
	}


	@Test
	public void getQuantidadeAgendamentos(){
		Long quantidadeAgendamentos = this.itemItemAgendaRepository.countByStatusAgendaOrStatusAgenda("Agendado","Aguardando Autorização");

		LOGGER.info("Teste quantidade Agendamentos :" +quantidadeAgendamentos);
		assertTrue(quantidadeAgendamentos >= 0);

	}

	@Test
	public void getQuantidadeAgendamentosMesSexo(){
		Calendar cal = Calendar.getInstance();

		Long quantidadeAgendamentos = this.itemItemAgendaRepository.findByPacienteQuantidadeAgendamentoMesSexo(10,"Masculino");

		LOGGER.info("Teste quantidade Agendamentos :" +quantidadeAgendamentos);
		assertTrue(quantidadeAgendamentos >= 0);

	}

	@Test
	public void getPacientesQuantidadeAgendamentosAnoSexo(){
		Calendar cal = Calendar.getInstance();

		Long quantidadeAgendamentos = this.itemItemAgendaRepository.findByPacienteQuantidadeAgendamentoAnoSexo(2017,"Masculino");

		LOGGER.info("Teste quantidade Agendamentos :" +quantidadeAgendamentos);
		assertTrue(quantidadeAgendamentos >= 0);

	}

	@Test
	public void getQuantidadeConsultasRealizadas(){
		Calendar cal = Calendar.getInstance();

		Long quantidadeAgendamentos = this.itemItemAgendaRepository.findByConsultasRealizadasMes(10,"Finalizado");

		LOGGER.info("Teste quantidade Agendamentos :" +quantidadeAgendamentos);
		assertTrue(quantidadeAgendamentos >= 0);

	}


	@Test
	public void getValorConsultsaMes(){
		HashMap<String, List<BigDecimal>> consultas = new HashMap<>();

		List<BigDecimal> valorConsultasRealizadas = new ArrayList<>();



		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -7);


		for(int i = 0; i < 7; i++){
			BigDecimal valorConsultaMes = this.itemItemAgendaRepository.findByValorConsultasRealizadasMes(cal.get(Calendar.MONTH),"Finalizado");

			if(valorConsultaMes == null){
				valorConsultasRealizadas.add(BigDecimal.ZERO);
			}else {
				valorConsultasRealizadas.add(valorConsultaMes);
			}



			cal.add(Calendar.MONTH, +1);

		}

		consultas.put("Consultas",valorConsultasRealizadas);

		LOGGER.info("Teste quantidade Agendamentos :" +consultas);
		assertTrue(consultas.size() > 0);

	}

}

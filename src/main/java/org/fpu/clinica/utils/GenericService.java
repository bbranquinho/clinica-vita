package org.fpu.clinica.utils;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.fpu.clinica.errors.ErrorServiceInterface;
import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



public abstract class GenericService<T extends BaseEntity<ID>, ID extends Serializable> implements ServiceMap {

	private final Logger LOGGER = Logger.getLogger(this.getClass());

	@Autowired
	protected JpaRepository<T, ID> genericRepository;

	@Autowired
	public ErrorServiceInterface errorServiceInterface;

	FieldsErrorDetalhe fieldsErrorDetalhe = new FieldsErrorDetalhe();
	Message message = new Message();

	@RequestMapping(method = RequestMethod.GET)
	public List<T> findAll() {
		this.LOGGER.debug("Requesting all records.");

		return this.genericRepository.findAll();
	}

	@Transactional
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> insert(@RequestBody @Validated T entityObject, Errors errors) {
		this.LOGGER.debug(String.format("Saving the entity [%s].", entityObject));
		// List<String> msg = new ArrayList<String>();

		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {
			this.LOGGER.error("Log erro hibernate validator" + fieldsErrorDetalhe);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}

		if (entityObject == null) {
			this.LOGGER.error("Entity with null value.");
			return null;
		}

		entityObject.setId(null);

		entityObject = this.genericRepository.save(entityObject);

		if (entityObject.getId() == null) {
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}

		// return
		// ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
		message.AddField("mensagem", "Salvo com sucesso");
		message.setData(entityObject);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<?> update(@RequestBody @Validated T entityObject, Errors errors) {
		this.LOGGER.debug(String.format("Request to update the record [%s].", entityObject));

		if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {
			this.LOGGER.error("Log erro hibernate validator" + fieldsErrorDetalhe);
			return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
		}

		if (entityObject == null) {
			this.LOGGER.error("Entity can not be null.");
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}

		if (entityObject.getId() == null) {
			this.LOGGER.error("ID can not be null.");
			message.AddField("mensagem", "Não encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}

		this.genericRepository.saveAndFlush(entityObject);

		message.AddField("mensagem", "Salvo com sucesso");

		return ResponseEntity.status(HttpStatus.OK).body(message);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<?> deletar(@RequestBody T entityObject) {
		this.LOGGER.debug(String.format("Request to delete the record [%s].", entityObject));

		try {
	
			if (entityObject == null) {
				this.LOGGER.error("Entity can not be null.");
				message.AddField("mensagem", "Não encontrado");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
			}
			this.genericRepository.delete(entityObject);

			message.getAtributeMessage().clear();
			message.AddField("statusError", "success");
			message.AddField("message", " Deletado com sucesso");

			return ResponseEntity.status(HttpStatus.OK).body(message);

		} catch (DataIntegrityViolationException e1) {

			message.AddField("statusError", "unsuccess");
			message.AddField("message", " Não foi possivel deletar pois existem outras tabelas a utilizando.");
		} catch (Exception e4) {
			message.AddField("statusError", "unsuccess");
			message.AddField("message", "  não pode ser deletado");

		}

		return ResponseEntity.status(HttpStatus.CONFLICT).body(message);

	}
}

package org.fpu.clinica.itemescala;

import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;
import org.fpu.clinica.escala.EscalaAtendimento;
import org.fpu.clinica.escala.EscalaAtendimentoRepository;
import org.fpu.clinica.medico.Medico;
import org.fpu.clinica.medico.MedicoRepository;
import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH)
public class ItemEscalaAtendimentoService extends GenericService<ItemEscalaAtendimento, Long> {

    @Autowired
    private ItemEscalaAtendimentoRepository itemEscalaAtendimentoRepository;

    @Autowired
    private EscalaAtendimentoRepository escalaAtendimentoRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    FieldsErrorDetalhe fieldsErrorDetalhe = new FieldsErrorDetalhe();
    Message message = new Message();

    @Transactional
    @RequestMapping(value = "/post_list_item_escala", method = RequestMethod.POST)
    public ResponseEntity<?> insert(@RequestBody  List<ItemEscalaAtendimento> itensEscalaAtendimentos, Errors errors) {


        if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
        }


        if(itensEscalaAtendimentos.size() != 0){
            List<ItemEscalaAtendimento> itensEscalaAtendimentosAux = new ArrayList<>();

            for (ItemEscalaAtendimento item : itensEscalaAtendimentos) {
                EscalaAtendimento escalaAtendimento = escalaAtendimentoRepository.findByMedico(item.getEscalaAtendimento().getMedico());

                if(escalaAtendimento == null){
                    escalaAtendimento = escalaAtendimentoRepository.save(item.getEscalaAtendimento());
                    itensEscalaAtendimentosAux.add(itemEscalaAtendimentoRepository.save(item));
                }else {
                    item.setEscalaAtendimento(escalaAtendimento);
                    itensEscalaAtendimentosAux.add(itemEscalaAtendimentoRepository.save(item));
                }


            }
        }


        message.AddField("mensagem", "Salvo com sucesso");
        message.setData(itensEscalaAtendimentos);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

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
            message.setData(itemEscalaAtendimento);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }


        // return
        // ResponseEntity.status(HttpStatus.OK).body(this.genericRepository.save(entityObject));
        message.AddField("mensagem", "Carregado com sucesso");
        message.setData(itemEscalaAtendimento);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @Transactional
    @RequestMapping(value = "/update_list_item_escala", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody  List<ItemEscalaAtendimento> itensEscalaAtendimentos, Errors errors) {


        if (errorServiceInterface.addErrors(fieldsErrorDetalhe, errors)) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(fieldsErrorDetalhe);
        }

        List<ItemEscalaAtendimento> itensEscalaAtendimentoDel = itemEscalaAtendimentoRepository.findAll();
        if(itensEscalaAtendimentoDel.size() > 0){
            for (ItemEscalaAtendimento item : itensEscalaAtendimentoDel) {
                itemEscalaAtendimentoRepository.delete(item);
            }
        }


        if(itensEscalaAtendimentos.size() != 0){
            List<ItemEscalaAtendimento> itensEscalaAtendimentosAux = new ArrayList<>();

            for (ItemEscalaAtendimento item : itensEscalaAtendimentos) {
                EscalaAtendimento escalaAtendimento = escalaAtendimentoRepository.findByMedico(item.getEscalaAtendimento().getMedico());

                if(escalaAtendimento == null){
                    escalaAtendimento = escalaAtendimentoRepository.save(item.getEscalaAtendimento());
                    itensEscalaAtendimentosAux.add(itemEscalaAtendimentoRepository.saveAndFlush(item));
                }else {
                    item.setEscalaAtendimento(escalaAtendimento);
                    itensEscalaAtendimentosAux.add(itemEscalaAtendimentoRepository.saveAndFlush(item));
                }


            }
        }


        message.AddField("mensagem", "Salvo com sucesso");
        message.setData(itensEscalaAtendimentos);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }


}

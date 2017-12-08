package org.fpu.clinica.utils;

import org.fpu.clinica.errors.FieldsErrorDetalhe;
import org.fpu.clinica.errors.Message;

import java.util.ArrayList;
import java.util.List;

public class ComUtils {

    public static void setMessageErro(Message message, FieldsErrorDetalhe fieldsErrorDetalhe, String chave1, String chave2, String valor1, String valor2) {
        List<String> mensagensErro;
        mensagensErro = new ArrayList<String>();
        mensagensErro.add(String.format(" %s : %s", chave1,
                valor1));

        fieldsErrorDetalhe.AddField(chave2, valor2);

        fieldsErrorDetalhe.setFieldsErrorMessages(mensagensErro);
    }
}

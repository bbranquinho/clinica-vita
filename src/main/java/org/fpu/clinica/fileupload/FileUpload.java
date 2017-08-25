package org.fpu.clinica.fileupload;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.fpu.clinica.utils.BaseEntity;



@Entity
@Table(name = "tb_file_upload")
@AttributeOverride(name = "id", column = @Column(name = "id_file_upload") )
public class FileUpload extends BaseEntity<Long> {


	private static final long serialVersionUID = 1L;

	@Lob
	private byte[] file;
	
	@Column(name = "mime_type", nullable = true)
	private String mimeType;

	public FileUpload() {

	}



	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	

}

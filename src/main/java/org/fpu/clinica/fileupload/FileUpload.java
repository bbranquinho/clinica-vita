package org.fpu.clinica.fileupload;

import org.fpu.clinica.utils.BaseEntity;

import javax.persistence.*;



@Entity
@Table(name = "tb_file_upload")
@AttributeOverride(name = "id", column = @Column(name = "id_file_upload") )
public class FileUpload extends BaseEntity<Long> {


	private static final long serialVersionUID = 1L;

	/*@Lob
	private byte[] file;*/

	@Column(columnDefinition="text")
	private String file;
	
	@Column(name = "mime_type", nullable = true)
	private String mimeType;

	public FileUpload() {

	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}
}

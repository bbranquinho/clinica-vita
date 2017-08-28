package org.fpu.clinica.fileupload;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {

	public FileUpload findByMimeType(String mimeType);

}

package org.fpu.clinica.fileupload;

import org.fpu.clinica.utils.GenericService;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = ServicePath.FILE_UPLOAD_PATH)
public class FileUploadService extends GenericService<FileUpload, Long>{


	
}

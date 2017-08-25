package org.fpu.clinica;

import org.fpu.clinica.utils.AppContext;
import org.junit.Test;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(value = { AppContext.class })
@ComponentScan(basePackages = { "org.fpu.clinica" })
public class ClinicaMedivitaApplicationTests {

	@Test
	public void contextLoads() {
	}

}

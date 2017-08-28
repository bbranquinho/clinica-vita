package org.fpu.test.clinica.utils;

import org.fpu.clinica.utils.AppContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(value = { AppContext.class })
@ComponentScan(basePackages = { "org.fpu.test.clinica" })
public class AppContextTest {

}

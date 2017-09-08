package org.fpu.clinica;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.FixedLocaleResolver;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Locale;

@SpringBootApplication
public class ClinicaMedivitaApplication {
	private static final Logger LOGGER = LogManager.getLogger(ClinicaMedivitaApplication.class);

	public static void main(String[] args) throws UnknownHostException {
		ApplicationContext app = SpringApplication.run(ClinicaMedivitaApplication.class, args);

		String applicationName = app.getEnvironment().getProperty("spring.application.name");
		String contextPath = app.getEnvironment().getProperty("server.contextPath");
		String port = app.getEnvironment().getProperty("server.port");
		String hostAddress = InetAddress.getLocalHost().getHostAddress();
	    LOGGER.info("\n|------------------------------------------------------------" +
				"\n| Application '" + applicationName + "' is running! Access URLs:" +
				"\n|   Local:      http://127.0.0.1:" + port + contextPath +
				"\n|   External:   http://" + hostAddress + ":" + port + contextPath +
				"\n|------------------------------------------------------------");
	}

	@Bean
	public LocaleResolver localeResolver() {
		return new FixedLocaleResolver(new Locale("pt", "BR"));
	}

}

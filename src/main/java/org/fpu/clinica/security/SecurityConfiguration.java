package org.fpu.clinica.security;
import org.fpu.clinica.utils.ServicePath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration  extends WebSecurityConfigurerAdapter {



	public static final String AUTH_ADMIN = "ROLE_ADMIN";

	public static final String AUTH_PACIENTE = "ROLE_PACIENTE";

	public static final String AUTH_MEDICO = "ROLE_MEDICO";

	public static final String AUTH_FUNCIONARIO = "ROLE_FUNCIONARIO";

	public static final String AUTH_SECRETARIA = "ROLE_SECRETARIA";



	@Autowired
	private UserDetailsService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this.userService).passwordEncoder(this.passwordEncoder);
	}



	@Override
	protected void configure(HttpSecurity http) throws Exception {



		http.httpBasic().and().authorizeRequests()
				.antMatchers("/css/**", "/js/**", "/fonts/**", "/img/**","/appsrc/**").permitAll()
				.antMatchers("/").permitAll()
				.antMatchers("index.html").permitAll()
				// Global Authority to OPTIONS (permit all).
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				// Public (permit all).
				.antMatchers(ServicePath.PUBLIC_ROOT_PATH + ServicePath.ALL).permitAll()

				// agenda Authorities.
				.antMatchers(HttpMethod.GET, ServicePath.AGENDA_PATH).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.AGENDA_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.AGENDA_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA,AUTH_PACIENTE)
				.antMatchers(HttpMethod.DELETE, ServicePath.AGENDA_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)

				// EscalaAtendimento Authorities.
				.antMatchers(HttpMethod.GET, ServicePath.ESCALA_ATENDIMENTO_PATH + "/findByMedico/*").hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.DELETE, ServicePath.ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)

				.antMatchers(HttpMethod.GET, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH + "/findByMedico/*").hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH + "/post_list_item_escala" ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH + "/update_list_item_escala" ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.DELETE, ServicePath.ITEM_ESCALA_ATENDIMENTO_PATH ).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)

				// itemagenda Authorities
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/gerarhorario").hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/findagenda").hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/findByMedico/*").hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/tipo_agenda").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/status_agenda").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/data_agendamento").hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/findCompromissoPaciente/*").hasAnyAuthority(AUTH_ADMIN,AUTH_PACIENTE)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/findCompromissoMedico/*").hasAnyAuthority(AUTH_ADMIN,AUTH_MEDICO)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/find_horario_agendamento/*").hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/quantidade_agendamentos").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/quantidade_agendamentos_sexo_mes").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/quantidade_agendamentos_sexo_ano").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/quantidade_consultas_realizadas_mes").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/valor_consultas_realizadas_mes").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH + "/quantidade_solicitacoes_agendamento").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.ITEM_AGENDA_PATH + "/cancelar_agendamento").hasAnyAuthority(AUTH_SECRETARIA,AUTH_PACIENTE)
				.antMatchers(HttpMethod.PUT, ServicePath.ITEM_AGENDA_PATH + "/rejeitar_agendamento").hasAnyAuthority(AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.ITEM_AGENDA_PATH + "/autorizar_agendamento").hasAnyAuthority(AUTH_SECRETARIA)


				.antMatchers(HttpMethod.GET, ServicePath.ITEM_AGENDA_PATH).hasAnyAuthority(AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.ITEM_AGENDA_PATH + "/gerar_agendamento").hasAnyAuthority(AUTH_ADMIN,AUTH_MEDICO, AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.ITEM_AGENDA_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.ITEM_AGENDA_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA,AUTH_PACIENTE)
				.antMatchers(HttpMethod.DELETE, ServicePath.ITEM_AGENDA_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)

				.antMatchers(HttpMethod.GET, ServicePath.CONVENIO_PATH).hasAnyAuthority(AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.CONVENIO_PATH + "/findByMedico/*").hasAnyAuthority(AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.CONVENIO_PATH).hasAnyAuthority(AUTH_SECRETARIA)
				.antMatchers(HttpMethod.PUT, ServicePath.CONVENIO_PATH).hasAnyAuthority(AUTH_SECRETARIA)
				.antMatchers(HttpMethod.DELETE, ServicePath.CONVENIO_PATH).hasAnyAuthority(AUTH_SECRETARIA)

				// cargo Authorities.
				.antMatchers(HttpMethod.GET, ServicePath.CARGO_PATH).hasAnyAuthority(AUTH_FUNCIONARIO,AUTH_ADMIN,AUTH_PACIENTE,AUTH_MEDICO,AUTH_SECRETARIA,AUTH_FUNCIONARIO)
				.antMatchers(HttpMethod.POST, ServicePath.CARGO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.CARGO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.DELETE, ServicePath.CARGO_PATH).hasAnyAuthority(AUTH_ADMIN)
				// setor Authorities.
				.antMatchers(HttpMethod.GET, ServicePath.SETOR_PATH).hasAnyAuthority(AUTH_FUNCIONARIO,AUTH_ADMIN,AUTH_PACIENTE,AUTH_MEDICO,AUTH_SECRETARIA,AUTH_FUNCIONARIO)
				.antMatchers(HttpMethod.POST, ServicePath.SETOR_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.SETOR_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.DELETE, ServicePath.SETOR_PATH).hasAnyAuthority(AUTH_ADMIN)
				// setor Authorities.
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/sexos").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/cidades").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/estados").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/registrosprofissionais").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/findById/*").hasAnyAuthority(AUTH_MEDICO,AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/findCurrentUser").hasAnyAuthority(AUTH_ADMIN,AUTH_MEDICO)
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/quantidade_medicos").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH + "/findByStatus/*").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.MEDICO_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.POST, ServicePath.MEDICO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.MEDICO_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_MEDICO)
				.antMatchers(HttpMethod.DELETE, ServicePath.MEDICO_PATH).hasAnyAuthority(AUTH_ADMIN)


				// Funcionario Authorities.

				.antMatchers(HttpMethod.GET, ServicePath.FUNCIONARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.POST, ServicePath.FUNCIONARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.FUNCIONARIO_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.DELETE, ServicePath.FUNCIONARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.FUNCIONARIO_PATH + "/matriculafuncionario").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.FUNCIONARIO_PATH + "/qtdAdmin").permitAll()
				// Cliente Authorities.

				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/sexos").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/escolaridades").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/estadoscivis").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/etnias").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/fatoressanguineos").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/matriculapaciente").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/quantidade_pacientes").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/findByStatus/*").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/quantidade_pacientes_sexo/*").hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/findById/*").hasAnyAuthority(AUTH_PACIENTE,AUTH_ADMIN)
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH + "/findCurrentUser").hasAnyAuthority(AUTH_ADMIN,AUTH_PACIENTE)
				.antMatchers(HttpMethod.GET, ServicePath.PACIENTE_PATH).hasAnyAuthority(AUTH_PACIENTE,AUTH_ADMIN)
				.antMatchers(HttpMethod.POST, ServicePath.PACIENTE_PATH).permitAll()
				.antMatchers(HttpMethod.PUT, ServicePath.PACIENTE_PATH).hasAnyAuthority(AUTH_PACIENTE,AUTH_ADMIN)
				.antMatchers(HttpMethod.DELETE, ServicePath.PACIENTE_PATH).hasAnyAuthority(AUTH_ADMIN)

				// Usuario Authorities.
				.antMatchers(HttpMethod.GET, ServicePath.USUARIO_PATH + "/findCurrentUser").hasAnyAuthority(AUTH_FUNCIONARIO,AUTH_ADMIN,AUTH_PACIENTE,AUTH_MEDICO,AUTH_SECRETARIA)
				.antMatchers(HttpMethod.GET, ServicePath.USUARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.POST, ServicePath.USUARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.USUARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.DELETE, ServicePath.USUARIO_PATH).hasAnyAuthority(AUTH_ADMIN)
				// Permissoes Authorities.

				.antMatchers(HttpMethod.GET, ServicePath.PERMISSAO_PATH + "/findRole/ROLE_CLIENTE").permitAll()
				.antMatchers(HttpMethod.GET, ServicePath.PERMISSAO_PATH).hasAnyAuthority(AUTH_ADMIN,AUTH_SECRETARIA,AUTH_FUNCIONARIO)
				.antMatchers(HttpMethod.POST, ServicePath.PERMISSAO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.PUT, ServicePath.PERMISSAO_PATH).hasAnyAuthority(AUTH_ADMIN)
				.antMatchers(HttpMethod.DELETE, ServicePath.PERMISSAO_PATH).hasAnyAuthority(AUTH_ADMIN).anyRequest()
				.fullyAuthenticated().and()
				// Logout configuration.
				.logout().logoutRequestMatcher(new AntPathRequestMatcher(ServicePath.LOGOUT_PATH))
				.logoutSuccessHandler(new LogoutHandler()).and()
				// CSRF configuration.
				.csrf().csrfTokenRepository(csrfTokenRepository()).and()
				.addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
	}

	private CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}

	private Filter csrfHeaderFilter() {
		return new OncePerRequestFilter() {

			@Override
			protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
											FilterChain filterChain) throws ServletException, IOException {
				CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());

				if (csrf != null) {
					Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
					String token = csrf.getToken();

					if (cookie == null || token != null && !token.equals(cookie.getValue())) {
						cookie = new Cookie("XSRF-TOKEN", token);
						cookie.setPath("/");
						response.addCookie(cookie);
					}
				}

				filterChain.doFilter(request, response);
			}

		};
	}

}

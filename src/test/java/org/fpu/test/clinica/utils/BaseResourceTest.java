package org.fpu.test.clinica.utils;

import org.junit.Before;
import org.junit.Rule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@WebAppConfiguration
@ContextConfiguration(classes = AppContextTest.class)
public abstract class BaseResourceTest extends BaseTest {

	  @Autowired
	    private WebApplicationContext context;

	    @Rule
	    public JUnitRestDocumentation restDocumentation = new JUnitRestDocumentation("target/generated-snippets");

	    protected MockMvc mockMvc;

	    @Before
	    public void setUp() {
	        RestDocumentationResultHandler document = MockMvcRestDocumentation.document(
	                "{method-name}",
	                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
	                Preprocessors.preprocessResponse(Preprocessors.prettyPrint())
	        );

	        mockMvc = MockMvcBuilders
	                .webAppContextSetup(this.context)
	                .apply(MockMvcRestDocumentation.documentationConfiguration(restDocumentation))
	                .alwaysDo(document).build();
	}
}

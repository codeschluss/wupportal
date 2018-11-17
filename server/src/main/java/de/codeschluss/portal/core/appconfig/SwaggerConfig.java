package de.codeschluss.portal.core.appconfig;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.Data;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Data
@Configuration
@EnableSwagger2
@ConfigurationProperties(prefix = "info")
public class SwaggerConfig {
	
	private String apiTitle;
	private String apiDescription;
	private String apiVersion;
	private String contactName;
	private String contactMail;
	
    @Bean
    public Docket api() { 
        return new Docket(DocumentationType.SWAGGER_2)  
        		.select()                                  
        		.apis(RequestHandlerSelectors.basePackage("de.codeschluss.portal"))            
        		.paths(PathSelectors.any())
        		.build()
        		.apiInfo(apiInfo());
    }

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title(apiTitle)
	            .description(apiDescription)
	            .contact(new Contact(contactName, null, contactMail))
	            .version(apiVersion)
	            .build();
	}

}

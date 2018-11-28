package de.codeschluss.portal.core.appconfig;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

// TODO: Auto-generated Javadoc
/**
 * Instantiates a new swagger config.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@Configuration
@EnableSwagger2
@ConfigurationProperties(prefix = "info")
public class SwaggerConfig {

  /** The api title. */
  private String apiTitle;
  
  /** The api description. */
  private String apiDescription;
  
  /** The api version. */
  private String apiVersion;
  
  /** The contact name. */
  private String contactName;
  
  /** The contact mail. */
  private String contactMail;

  /**
   * Api.
   *
   * @return the docket
   */
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2).select()
        .apis(RequestHandlerSelectors.basePackage("de.codeschluss.portal"))
        .paths(PathSelectors.any()).build().apiInfo(apiInfo());
  }

  /**
   * Api info.
   *
   * @return the api info
   */
  private ApiInfo apiInfo() {
    return new ApiInfoBuilder().title(apiTitle).description(apiDescription)
        .contact(new Contact(contactName, null, contactMail)).version(apiVersion).build();
  }

}

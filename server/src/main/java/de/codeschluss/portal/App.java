/*
 * @author Valmir Etemi
 */

package de.codeschluss.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * The Class App.
 *
 * @author Valmir Etemi
 *
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAspectJAutoProxy
public class App {

  /**
   * The main method.
   *
   * @param args
   *          the arguments
   */
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  /**
   * Bcrypt password encoder.
   *
   * @return the b crypt password encoder
   */
  @Bean
  public BCryptPasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}

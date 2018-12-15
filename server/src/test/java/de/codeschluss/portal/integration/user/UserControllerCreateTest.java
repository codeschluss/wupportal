package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.integration.SmtpServerRule;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.assertj.core.api.Condition;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerCreateTest {

  @Autowired
  private UserController controller;

  @Autowired
  private UserService service;
  
  @Rule
  public SmtpServerRule smtpServerRule = new SmtpServerRule(2525);

  @Test
  public void createWithoutOrganisationsOk() throws URISyntaxException {
    UserEntity user = newUser("createWithoutSecurityOk", "test", "12345678", true,
        "createWithoutSecurityOk");

    controller.create(user);

    assertThat(service.userExists(user.getUsername())).isTrue();
  }
  
  @Test
  @SuppressWarnings("unchecked")
  @WithUserDetails("super@user")
  public void createWithOrganisationsOk() throws URISyntaxException {
    String orgaId1 = "00000000-0000-0000-0008-100000000000";
    String orgaId2 = "00000000-0000-0000-0008-200000000000";
    
    List<String> orgas = new ArrayList<String>();
    orgas.add(orgaId1);
    orgas.add(orgaId2);
    UserEntity user = newUser("createWithoutSecurityOk", "test", "12345678", true,
        "createWithoutSecurityOk");
    user.setOrganisationRegistrations(orgas);

    UserEntity savedUser = ((Resource<UserEntity>) controller.create(user).getBody()).getContent();

    assertThat(service.userExists(user.getUsername())).isTrue();
    assertThat(smtpServerRule.getMessages()).isNotEmpty();
    assertContaining(savedUser.getId(), orgaId1, orgaId2);
  }

  @Test(expected = BadParamsException.class)
  public void createNotValidUsernameDenied() throws URISyntaxException {
    UserEntity user = newUser("createNotValidUsernameDenied", "test", "12345678", true, null);

    controller.create(user);
  }

  @Test(expected = BadParamsException.class)
  public void createNotValidPasswordDenied() throws URISyntaxException {
    UserEntity user = newUser("createNotValidPasswordDenied", null, "12345678", true,
        "createNotValidPasswordDenied");

    controller.create(user);
  }

  @Test(expected = DuplicateEntryException.class)
  public void createWithoutSecurityDuplicated() throws URISyntaxException {
    UserEntity user = newUser("test", "test", "12345678", true, "provider1@user");

    controller.create(user);
  }

  private UserEntity newUser(String name, String password, String phone, boolean superuser,
      String username) {
    UserEntity user = new UserEntity();
    user.setName(name);
    user.setPassword(password);
    user.setPhone(phone);
    user.setSuperuser(superuser);
    user.setUsername(username);
    return user;
  }
  
  @SuppressWarnings("unchecked")
  private void assertContaining(String userId, String... orgaId) {
    Resources<Resource<OrganisationEntity>> result = (Resources<Resource<OrganisationEntity>>) 
        controller.readOrganisations(userId, null).getBody();
    assertThat(result.getContent()).haveExactly(orgaId.length, new Condition<>(
        p -> Arrays.asList(orgaId).contains(p.getContent().getId()), 
        "new organisation with given orga exists"));
  }

}

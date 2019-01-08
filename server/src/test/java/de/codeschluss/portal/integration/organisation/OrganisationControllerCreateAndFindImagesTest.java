package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import de.codeschluss.portal.components.images.organisation.OrganisationImageEntity;
import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.image.ImageService;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.Base64Utils;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerCreateAndFindImagesTest {

  @Autowired
  private OrganisationController controller;

  @MockBean
  private ImageService imageService;

  @Test
  @WithUserDetails("super@user")
  public void addAndFindImagesSuperUserOk() throws IOException {
    given(this.imageService.resize(Mockito.any(), Mockito.any())).willReturn("test".getBytes());
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", Base64Utils.encodeToString("test".getBytes()), "image/png");
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);
    
    Resources<?> result = (Resources<?>) controller
        .readImages("00000000-0000-0000-0008-100000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  @WithUserDetails("admin@user")
  public void addAndFindImagesOwnOrgaOk() throws IOException {
    given(this.imageService.resize(Mockito.any(), Mockito.any())).willReturn("test".getBytes());
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", Base64Utils.encodeToString("test".getBytes()), "image/png");
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);

    Resources<?> result = (Resources<?>) controller
        .readImages("00000000-0000-0000-0008-100000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("admin@user")
  public void addNotValidImageDenied() throws IOException {
    given(this.imageService.resize(Mockito.any(), Mockito.any())).willReturn(null);
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", null, "image/png");
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("admin@user")
  public void addNullMimeTypeDenied() throws IOException {
    given(this.imageService.resize(Mockito.any(), Mockito.any())).willReturn(null);
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", "test", null);
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("admin@user")
  public void addNotValidMimeTypeDenied() throws IOException {
    given(this.imageService.resize(Mockito.any(), Mockito.any())).willReturn(null);
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", "test", "notvalid");
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addAndFindImagesOtherOrgaDenied() throws IOException {
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", Base64Utils.encodeToString("test".getBytes()), "test");
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);
  }
  
  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addAndFindImagesNotRegisteredDenied() throws IOException {
    OrganisationImageEntity imageInput = newOrganisationImageEntity(
        "test", Base64Utils.encodeToString("test".getBytes()), "test");
    controller.addImage("00000000-0000-0000-0008-100000000000", imageInput);
  }

  @Test(expected = NotFoundException.class)
  public void findImagesByOrganisationNotFound() {
    Resources<?> result = (Resources<?>) controller
        .readImages("00000000-0000-0000-0008-XX0000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
  
  /**
   * New organisation image entity.
   *
   * @param string the string
   * @param encodeToString the encode to string
   * @return the organisation image entity
   */
  private OrganisationImageEntity newOrganisationImageEntity(
      String caption, 
      String data,
      String mimeType) {
    OrganisationImageEntity image = new OrganisationImageEntity();
    image.setCaption(caption);
    image.setImageData(data);
    image.setMimeType(mimeType);
    return image;
  }
}
